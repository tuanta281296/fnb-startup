using System;
using System.Collections.Generic;
using System.Text;
using Entities.Data.Model.PO;

namespace Entities.Data.JsonInput
{
    public class POProductInput
    {
        public List<PO_Product> ProductsForUpdate { get; set; }
        public bool NewStatus { get; set; }

        public int[] ProdcutIdsForDelete { get; set; }
    }

    public class POProductInputDelete
    {
       public List<int> ProdcutIdsForDelete { get; set; }
    }
}
