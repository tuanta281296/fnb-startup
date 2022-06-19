using Entities.Data.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Entities.Data.Common
{
    public class Common
    {
        public class QueryParamsModel<T>
        {
            public T Filter { get; set; }
            public string SortOrder { get; set; }
            public string SortField { get; set; }
            public int PageNumber { get; set; }
            public int PageSize { get; set; }
        }


        public class CommonFunc 
        {
            public static string UploadImage(string pathToSave, string folderName, IFormFile file)
            {
                var fileName = System.Net.Http.Headers.ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                string dbPath = Path.Combine(folderName, fileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                return dbPath;
            }

            public static void DeleteFileImage(string imageType, string fileName)
            {
                var folderName = Path.Combine("Images", imageType);
                string dbPath = Path.Combine(folderName, fileName);
                if (File.Exists(dbPath))
                {
                    File.Delete(dbPath);
                }
            }
        }
    }
}
