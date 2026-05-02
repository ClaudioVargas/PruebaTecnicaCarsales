using back.Core.Entity;

namespace back.Core.Interfaces
{
    public interface IContactoService
    {
        IEnumerable<Contacto> GetAll();
        Contacto? GetById(int id);
        Contacto? Add(Contacto contacto);
        bool Update(Contacto contacto);
        bool Delete(int id);
    }
}
