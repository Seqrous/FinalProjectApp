using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
   
    public class PagingList<T> : List<T>
    {
        //public List<T> Items = new List<T>();
        private List<T> items = new List<T>();
        //private var items = new List<T>();

        public  List<T> Items
        {
            get
            {
                return items;
            }

            set { items = value; }
        }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        

        private bool HasPrevious
        {
            get
            {
                return (CurrentPage > 1);
            }
        
        }
        private bool HasNext
        {
            get
            {
                return (CurrentPage < TotalPages);
            }
        }
        public PagingList(List<T> items, int totalCount, int currentPage, int pageSize)
        {
            TotalCount = totalCount;
            PageSize = pageSize;
            CurrentPage = currentPage;
            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            Items= items;
        }
        public static async Task<PagingList<T>> CreateList(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var total_count = await source.CountAsync();
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagingList<T>(items, total_count, pageNumber, pageSize);


        }
    }
}  
    

