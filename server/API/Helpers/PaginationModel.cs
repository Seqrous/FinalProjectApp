﻿namespace API.Helpers
<<<<<<< HEAD

=======
>>>>>>> fixed comments for products
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
    }
}
