using Abc.BusinessService;
using Abc.UnitOfWorkLibrary;
using ABC.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAssemblyApp.Shared;
using Route = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace WebAssemblyApp.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles ="Admin,User")]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly IUnitOfWork unitOfWork;
        private readonly IAuthorService authorService;

        public BookController(IBookService bookService, IUnitOfWork unitOfWork, IAuthorService authorService)
        {
            this._bookService = bookService;
            this.unitOfWork = unitOfWork;
            this.authorService = authorService; 
        }

        [HttpGet]
        [Route("GetBook")]
        public async Task<IActionResult> GetBook([FromQuery] int id)
        {
            if (id == 0)
                return BadRequest();

            var item = (await this._bookService.GetBooks(x => x.Id == id)).FirstOrDefault();

            if (item != null)
            {
                var _book = new BookModel
                {
                    Id = item.Id,
                    Title = item.Title,
                    Description = item.Description,
                    AuthorName = item.Author.Name,
                    AuthorId = item.AuthorId
                };

                return Ok(_book);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("GetBooks")]
        public async Task<IActionResult> GetBooks()
        {
            var booksObj = await this._bookService.GetAllBooks();

            List<BookModel> models = new List<BookModel>();

            foreach (var item in booksObj)
            {
                var _book = new BookModel
                {
                    Id = item.Id,
                    Title = item.Title,
                    Description = item.Description,
                    AuthorName = item.Author.Name,
                    AuthorId = item.AuthorId
                };
                models.Add(_book);
            }

            return Ok(models);
        }

        [HttpPost]
        [Route("AddBook")]
        public async Task<IActionResult> AddBook(BookModel model)
        {
            using (var trans = await this.unitOfWork.BeginTransactionAsync())
            {
                try
                {
                    await this._bookService.AddBook(new ABC.Models.Book { Title = model.Title, Description = model.Description, AuthorId = model.AuthorId });
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

        [HttpPost]
        [Route("DeleteBook")]
        public async Task<IActionResult> DeleteBook(BookModel bookObj)
        {
            if (bookObj != null)
            {
                var deleteObj = (await this._bookService.GetBooks(x => x.Id == bookObj.Id)).FirstOrDefault();
               
                if (deleteObj != null)
                {
                    using (var trans = await this.unitOfWork.BeginTransactionAsync())
                    {
                        try
                        {
                            await this._bookService.DeleteBook(bookObj.Id);
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
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("UpdateBook")]
        public async Task<IActionResult> UpdateBook(BookModel model)
        {
            if (model != null)
            {
                var bookObj = (await this._bookService.GetBooks(x => x.Id == model.Id)).FirstOrDefault();
                
                if (bookObj != null)
                {
                    using (var transaction = await this.unitOfWork.BeginTransactionAsync())
                    {
                        try
                        {
                            await this._bookService.UpdateBook(new ABC.Models.Book { Id = model.Id, Title = model.Title, Description = model.Description, AuthorId = model.AuthorId });
                            await this.unitOfWork.CommitTransactionAsync(transaction);
                            return Ok();
                        }
                        catch (Exception)
                        {
                            await this.unitOfWork.RollbackTransactionAsync(transaction);
                            throw;
                        }
                        finally
                        {
                            await transaction.DisposeAsync();
                        }
                    }
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
