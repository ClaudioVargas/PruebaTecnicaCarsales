using back.Core.Entity;
using back.Core.Interfaces;

namespace back.Repositories
{
    public class ContactoRepository : IContactoRepository
    {

        private readonly List<Contacto> contactos = new();
        private int _nextId = 1;


        public IEnumerable<Contacto> GetAll()
        {
            return contactos;
        }

        public Contacto? GetById(int id)
        {
            return contactos.FirstOrDefault(c => c.Id == id);
        }

        public void Add(Contacto contacto)
        {
            contacto.Id = _nextId++;
            contactos.Add(contacto);
        }

        public bool Update(Contacto contacto)
        {
            var index = contactos.FindIndex(item => item.Id == contacto.Id);
            if (index != -1)
            {
                contactos[index] = contacto;
                return true;
            }
            return false;
        }

        public bool Delete(int id)
        {
            var contacto = GetById(id);
            if (contacto != null)
            {
                contactos.Remove(contacto);
                return true;
            }
            return false;
        }

    }
}
