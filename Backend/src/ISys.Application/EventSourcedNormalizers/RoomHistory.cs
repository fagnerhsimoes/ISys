using System;
using System.Collections.Generic;
using System.Linq;
using ISys.Domain.Core.Events;
using Newtonsoft.Json;

namespace ISys.Application.EventSourcedNormalizers
{
    public class RoomHistory
    {
        public static IList<RoomHistoryData> HistoryData { get; set; }

        public static IList<RoomHistoryData> ToJavaScriptRoomHistory(IList<StoredEvent> storedEvents)
        {
            HistoryData = new List<RoomHistoryData>();
            RoomHistoryDeserializer(storedEvents);

            var sorted = HistoryData.OrderBy(c => c.When);
            var list = new List<RoomHistoryData>();
            var last = new RoomHistoryData();

            foreach (var change in sorted)
            {
                var jsSlot = new RoomHistoryData
                {
                    Id = change.Id == Guid.Empty.ToString() || change.Id == last.Id
                        ? ""
                        : change.Id,
                    Description = string.IsNullOrWhiteSpace(change.Description) || change.Description == last.Description
                        ? ""
                        : change.Description,
                    Action = string.IsNullOrWhiteSpace(change.Action) ? "" : change.Action,
                    When = change.When,
                    Who = change.Who
                };

                list.Add(jsSlot);
                last = change;
            }
            return list;
        }

        private static void RoomHistoryDeserializer(IEnumerable<StoredEvent> storedEvents)
        {
            foreach (var e in storedEvents)
            {
                var slot = new RoomHistoryData();
                dynamic values;

                switch (e.MessageType)
                {
                    case "RoomRegisteredEvent":
                        values = JsonConvert.DeserializeObject<dynamic>(e.Data);
                        slot.Description = values["Description"];
                        slot.Action = "Registered";
                        slot.When = values["Timestamp"];
                        slot.Id = values["Id"];
                        slot.Who = e.User;
                        break;
                    case "RoomUpdatedEvent":
                        values = JsonConvert.DeserializeObject<dynamic>(e.Data);
                        slot.Description = values["Description"];
                        slot.Action = "Updated";
                        slot.When = values["Timestamp"];
                        slot.Id = values["Id"];
                        slot.Who = e.User;
                        break;
                    case "RoomRemovedEvent":
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