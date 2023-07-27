using Abc.BusinessService;
using Abc.UnitOfWorkLibrary;
using ABC.BusinessBase.Migrations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using WebAssemblyApp.Shared;
using WebAssemblyApp.Shared.ViewModel;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace WebAssemblyApp.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles ="Admin,User")]
    public class AuthorController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IAuthorService authorService;
        private readonly IWebHostEnvironment environment;

        public AuthorController(IWebHostEnvironment environment, IUnitOfWork unitOfWork, IAuthorService authorService)
        {
            this.unitOfWork = unitOfWork;
            this.authorService = authorService;
            this.environment = environment;
        }

        [HttpGet]
        [Route("GetAuthor")]
        public async Task<IActionResult> GetAuthor([FromQuery]int id)
        {
            var data = (await this.authorService.GetAuthors(x => x.Id == id)).FirstOrDefault();

            if (data==null)
            {
                return NotFound();
            }

            string  authorImgBase64 = string.Empty;

            var books = data.Books.Select(x => new BookModel { Id = x.Id, AuthorId = x.AuthorId, AuthorName = x.Author.Name, Title = x.Title, Description = x.Description }).ToList();
            //if (!string.IsNullOrEmpty(data.PhotoContent)) {
            //   var authorPhotoContent = GetBytes(data.PhotoContent);
            //   authorImgBase64 = Convert.ToBase64String(authorPhotoContent);
            //}
            
            var authModel = new AuthorModel() { Id = data.Id, Name = data.Name, Books = books, PhotoName = data.PhotoName, DownloadPhotoContent = data.PhotoContent };
            return Ok(authModel);
        }

        [HttpPost]
        [Route("UpdateAuthor")]
        public async Task<IActionResult> UpdateAuthor(UpdateAuthorModel updateModel)
        {
            using (var trans = await this.unitOfWork.BeginTransactionAsync())
            {
                var model = await this.authorService.GetAuthors(x => x.Id == updateModel.Id);
                if (model == null)
                    return NotFound();

                try
                {
                    string filename = null;
                    string photo = null;

                    if (updateModel.UserPhotoInBytes.Length > 0)
                    {
                         filename = updateModel.PhotoName ?? "noimage.jpg";
                         photo = updateModel.UserPhotoInBytes;
                    }
                    await this.authorService.UpdateAuthor(new ABC.Models.Author { Id = updateModel.Id, Name = updateModel.Name, PhotoName = filename, PhotoContent = photo });
                    await this.unitOfWork.CommitTransactionAsync(trans);
                    return Ok();
                }
                catch (Exception)
                {
                    await this.unitOfWork.RollbackTransactionAsync(trans);
                    throw;
                }
                finally
                {
                    await trans.DisposeAsync();
                }
            }
        }

        [HttpGet]
        [Route("GetAuthors")]
        public async Task<IActionResult> GetAuthors()
        {
            var listData = await this.authorService.GetAllAuthors();
            List<AuthorModel> authors = new List<AuthorModel>();

            foreach (var item in listData)
            {
                var model = new AuthorModel { Id = item.Id, Name = item.Name };
                List<BookModel> books = new List<BookModel>();

                if (item.Books != null)
                {
                    foreach (var book in item.Books)
                    {
                        var _book = new BookModel
                        {
                            Id = book.Id,
                            Title = book.Title,
                            Description = book.Description,
                            AuthorName = item.Name
                        };

                        books.Add(_book);
                    }
                }

                model.Books = books;
                authors.Add(model);
            }

            return Ok(authors);
        }

        [HttpPost]
        [RouteAttribute("DeleteAuthor")]
        public async Task<IActionResult> DeleteAuthor(DeleteAuthorModal model)
        {
            using (var trans = await this.unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    await this.authorService.DeleteAuthor(model.Id);
                    await this.unitOfWork.CommitTransactionAsync(trans);
                    return Ok();
                }
                catch (Exception)
                {
                    await this.unitOfWork.RollbackTransactionAsync(trans);
                    return NotFound();                    
                }
                finally
                {
                    await trans.DisposeAsync();
                }
            }
        }

        [HttpPost]
        [Route("AddAuthor")]
        public async Task<IActionResult> AddAuthor(AuthorModel model)
        {
            if (string.IsNullOrEmpty(model.Name))
            {
                return BadRequest();
            }

            using (var trans = await this.unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    List<ABC.Models.Book> _books = new List<ABC.Models.Book>();

                    if (model.Books != null)
                    {
                        _books.AddRange(model.Books.Select(x => new ABC.Models.Book { AuthorId = model.Id, Title = x.Title, Description = x.Description }));
                    }

                    await this.authorService.AddAuthor(new ABC.Models.Author { Id = model.Id, Name = model.Name, Books = _books });
                    await this.unitOfWork.CommitTransactionAsync(trans);

                    return Ok();
                }
                catch (Exception)
                {
                    await this.unitOfWork.RollbackTransactionAsync(trans);
                    throw;
                }
                finally
                {
                    await trans.DisposeAsync();
                }
            }
        }

        static byte[] GetBytes(string strData)
        {
            return Convert.FromBase64String(strData);                        
        }

        static string GetString(byte[] bytesData)
        {
            return Convert.ToBase64String(bytesData);            
        }

    }
}
