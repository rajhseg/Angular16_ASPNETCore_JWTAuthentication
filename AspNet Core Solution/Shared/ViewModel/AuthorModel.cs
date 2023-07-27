using System.ComponentModel.DataAnnotations;

namespace WebAssemblyApp.Shared
{
    public class AuthorModel
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string PhotoName { get; set; }

        public string UploadPhotoContent { get; set; }

        public string DownloadPhotoContent { get; set; }

        public IEnumerable<BookModel> Books { get; set; }
    }
}
