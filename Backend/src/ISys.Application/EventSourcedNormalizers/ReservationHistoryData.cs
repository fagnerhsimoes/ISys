namespace ISys.Application.EventSourcedNormalizers
{
    public class ReservationHistoryData
    {
        public string Action      { get; set; }
        public string Id          { get; set; }
        public string Title       { get; set; }
        public string DateInitial { get; set; }
        public string DateFinal   { get; set; }
        public string RoomId      { get; set; }
        public string When        { get; set; }
        public string Who         { get; set; }
    }
}