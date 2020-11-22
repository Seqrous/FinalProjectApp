namespace API.Helpers
{
    public class PaginationModel
    {
        private const int MaxPageSize = 100;
        public int PageNumber { get; set; } = 1;
        private int _pageSize =  25;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public decimal MinPrice { get; set; }
        public decimal MaxPrice { get; set; }
    }
}
