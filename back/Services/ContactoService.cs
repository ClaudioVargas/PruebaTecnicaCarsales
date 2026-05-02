using back.Core.Entity;
using back.Core.Interfaces;
using back.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace back.Services
{
    public class ContactoService: IContactoService
    {
        private readonly IContactoRepository _contactoRepository;

        public ContactoService(IContactoRepository contactoRepository)
        {
            _contactoRepository = contactoRepository;
        }

        public Contacto? Add(Contacto contacto)
        {
            
            var contactoCreado = _contactoRepository.Add(contacto);
            if (contactoCreado != null)
            {
                return contactoCreado;
            }
            return null;
           
        }

        public bool Delete(int id)
        {
            return _contactoRepository.Delete(id);

        }

        public IEnumerable<Contacto> GetAll()
        {
            var contactos = _contactoRepository.GetAll();
            if (contactos.Count() > 0)
            {
                return contactos;

            }

            return Enumerable.Empty<Contacto>();
        }

        public Contacto? GetById(int id)
        {
            var contacto = _contactoRepository.GetById(id);
            if (contacto == null)
            {
                return null;
            }
            return contacto;
        }

        public bool Update(Contacto contacto)
        {
            contacto.Id = contacto.Id;
            return _contactoRepository.Update(contacto);
     
        }
    }
}
