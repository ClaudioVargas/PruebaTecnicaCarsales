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

        public Contacto Add(Contacto contacto)
        {

            var existe =  isDuplicado(contactos, contacto.Telefono);
            if (!existe)
            {
                contacto.Id = _nextId++;
                contactos.Add(contacto);
                return contacto;
            }
            else {
                return null;
            }
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

        public bool isDuplicado(List<Contacto> arr, string phone)
        {
            foreach (var item in arr)
            {
                if (item.Telefono.Equals(phone)) return true;
            }
            return false;
        }
    }
}

