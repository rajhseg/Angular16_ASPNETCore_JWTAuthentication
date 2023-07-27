using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAssemblyApp.Shared.ViewModel
{
	public class UpdateAuthorModel
	{
        public string UserPhotoInBytes { get; set; }

        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string PhotoName { get; set; }

        public IEnumerable<BookModel> Books { get; set; }
    }
}
