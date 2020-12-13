namespace ISys.Infra.CrossCutting.Identity.Models
{
    public class TokenDto
    {
        public bool   Authenticated { get; set; }
        public string Created     { get; set; }
        public string Expiration  { get; set; }
        public string Token       { get; set; }
        public string Message     { get; set; }
        public string Email   { get; set; }
        public string Name    { get; set; }
    }
}