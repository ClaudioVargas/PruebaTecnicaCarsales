using back.Core.Entity;

namespace back.Core.Interfaces
{
    public interface IContactoRepository
    {
        IEnumerable<Contacto> GetAll();
        Contacto? GetById(int id);
        void Add(Contacto contacto);
        bool Update(Contacto contacto);
        bool Delete(int id);
    }
}
