namespace Notalone.API.Infrastructure.Communication
{
    public class ListUserResource
    {
        public int Limit { get; set; }
        public int Offset { get; set; }
        public bool OrderByDescending { get; set; }
    }
}