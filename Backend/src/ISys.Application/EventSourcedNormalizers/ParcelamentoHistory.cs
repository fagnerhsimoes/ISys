using System;
using System.Collections.Generic;
using System.Linq;
using ISys.Domain.Core.Events;
using Newtonsoft.Json;

namespace ISys.Application.EventSourcedNormalizers
{
    public class ParcelamentoHistory
    {
        public static IList<ParcelamentoHistoryData> HistoryData { get; set; }

        public static IList<ParcelamentoHistoryData> ToJavaScriptParcelamentoHistory(IList<StoredEvent> storedEvents)
        {
            HistoryData = new List<ParcelamentoHistoryData>();
            ParcelamentoHistoryDeserializer(storedEvents);

            var sorted = HistoryData.OrderBy(c => c.When);
            var list = new List<ParcelamentoHistoryData>();
            var last = new ParcelamentoHistoryData();

            foreach (var change in sorted)
            {
                var jsSlot = new ParcelamentoHistoryData
                {
                    Id = change.Id == Guid.Empty.ToString() || change.Id == last.Id
                        ? ""
                        : change.Id,
                    Action = string.IsNullOrWhiteSpace(change.Action) ? "" : change.Action,
                    When = change.When,
                    Who = change.Who
                };

                list.Add(jsSlot);
                last = change;
            }
            return list;
        }

        private static void ParcelamentoHistoryDeserializer(IEnumerable<StoredEvent> storedEvents)
        {
            foreach (var e in storedEvents)
            {
                var slot = new ParcelamentoHistoryData();
                dynamic values;

                switch (e.MessageType)
                {
                    case "ParcelamentoRegisteredEvent":
                        values = JsonConvert.DeserializeObject<dynamic>(e.Data);
                        slot.Action = "Registered";
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