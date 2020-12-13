namespace ISys.Infra.CrossCutting.Identity.Models
{
    public class AppSettings
    {
        public string Secret   { get; set; }
        public int    Expires     { get; set; }
        public string Audience { get; set; }
        public string Issuer   { get; set; }
    }
}