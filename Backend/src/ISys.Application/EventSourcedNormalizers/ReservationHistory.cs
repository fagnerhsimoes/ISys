using System;
using System.Collections.Generic;
using System.Linq;
using ISys.Domain.Core.Events;
using Newtonsoft.Json;

namespace ISys.Application.EventSourcedNormalizers
{
    public class ReservationHistory
    {
        public static IList<ReservationHistoryData> HistoryData { get; set; }

        public static IList<ReservationHistoryData> ToJavaScriptReservationHistory(IList<StoredEvent> storedEvents)
        {
            HistoryData = new List<ReservationHistoryData>();
            ReservationHistoryDeserializer(storedEvents);

            var sorted = HistoryData.OrderBy(c => c.When);
            var list = new List<ReservationHistoryData>();
            var last = new ReservationHistoryData();

            foreach (var change in sorted)
            {
                var jsSlot = new ReservationHistoryData
                {
                    Id = change.Id == Guid.Empty.ToString() || change.Id == last.Id
                        ? ""
                        : change.Id,
                    Title = string.IsNullOrWhiteSpace(change.Title) || change.Title == last.Title
                        ? ""
                        : change.Title,
                    DateInitial = string.IsNullOrWhiteSpace(change.DateInitial) || change.DateInitial == last.DateInitial
                        ? ""
                        : change.DateInitial.Substring(0, 19),
                    DateFinal = string.IsNullOrWhiteSpace(change.DateFinal) || change.DateFinal == last.DateFinal
                        ? ""
                        : change.DateFinal.Substring(0, 19),
                    RoomId = change.RoomId == Guid.Empty.ToString() || change.RoomId == last.RoomId
                        ? ""
                        : change.RoomId,
                    Action = string.IsNullOrWhiteSpace(change.Action) ? "" : change.Action,
                    When = change.When,
                    Who = change.Who
                };

                list.Add(jsSlot);
                last = change;
            }
            return list;
        }

        private static void ReservationHistoryDeserializer(IEnumerable<StoredEvent> storedEvents)
        {
            foreach (var e in storedEvents)
            {
                var slot = new ReservationHistoryData();
                dynamic values;

                switch (e.MessageType)
                {
                    case "ReservationRegisteredEvent":
                        values = JsonConvert.DeserializeObject<dynamic>(e.Data);
                        slot.DateFinal = values["DateFinal"];
                        slot.DateInitial = values["DateInitial"];
                        slot.Title = values["Title"];
                        slot.RoomId = values["RoomId"];
                        slot.Action = "Registered";
                        slot.When = values["Timestamp"];
                        slot.Id = values["Id"];
                        slot.Who = e.User;
                        break;
                    case "ReservationUpdatedEvent":
                        values = JsonConvert.DeserializeObject<dynamic>(e.Data);
                        slot.DateFinal = values["DateFinal"];
                        slot.DateInitial = values["DateInitial"];
                        slot.Title = values["Title"];
                        slot.RoomId = values["RoomId"];
                        slot.Action = "Updated";
                        slot.When = values["Timestamp"];
                        slot.Id = values["Id"];
                        slot.Who = e.User;
                        break;
                    case "ReservationRemovedEvent":
                        values = JsonConvert.DeserializeObject<dynamic>(e.Data);
                        slot.Action = "Removed";
                        slot.When = values["Timestamp"];
                        slot.Id = values["Id"];
                        slot.Who = e.User;
                        break;
                }
                HistoryData.Add(slot);
            }
        }
    }
}