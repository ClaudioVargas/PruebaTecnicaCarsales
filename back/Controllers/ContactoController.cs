using back.Models;
using back.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : ControllerBase
    {
        private readonly ContactoRepositories _contactoRepository;

        public ContactoController(ContactoRepositories contactoRepository)
        {
            _contactoRepository = contactoRepository;
        }

        // GET: api/<ContactoController>
        [HttpGet]
        public IActionResult Get()
        {
            var contactos = _contactoRepository.GetAll();
            if (contactos.Count() > 0) {
                return Ok(contactos);
            }

            return Ok();
        }

        // GET api/<ContactoController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var contacto = _contactoRepository.GetById(id);
            if (contacto == null) { 
                return NotFound();
            }
            return Ok(contacto);
        }

        // POST api/<ContactoController>
        [HttpPost]
        public void Post([FromBody] Contacto contacto)
        {
            _contactoRepository.Add(contacto);
        }

        // PUT api/<ContactoController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Contacto contacto)
        {
            var editado = _contactoRepository.Update(contacto);
            if(editado)
            {
                return Ok();
            }
            return NotFound();
        }

        // DELETE api/<ContactoController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var eliminado = _contactoRepository.Delete(id);
            if(eliminado)
            {
                return Ok();
            }
            return NotFound();

        }
    }
}
