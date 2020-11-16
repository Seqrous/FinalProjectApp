namespace API.Helpers
{
    public class PaginationResponse <T>
    {
        public PaginationResponse() { }

        public PaginationResponse(T inf)
        {
            Information = inf;
            Succeeded = true;
            Errors = null;
            Message = string.Empty;
        }

        public T Information { get; set; }
        public bool Succeeded { get; set; }
        public string[] Errors { get; set; }
        public string Message { get; set; }
    }
}
