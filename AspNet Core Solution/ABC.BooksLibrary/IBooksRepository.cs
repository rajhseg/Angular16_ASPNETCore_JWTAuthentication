using ABC.BusinessBase;
using ABC.Models;
using System.Linq.Expressions;

namespace ABC.BooksLibrary
{
    public interface IBooksRepository : IReposistory<Book>
    {
        Task updateDescriptionAsync(int Id, string description);

        Task<IEnumerable<Book>> GetAllWithAuthors();

        Task<IEnumerable<Book>> GetAllWithAuthors(Expression<Func<Book, bool>> predicate);
    }
}