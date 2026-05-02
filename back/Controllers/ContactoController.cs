using back.Core.Entity;
using back.Core.Interfaces;
using back.Repositories;
using back.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : ControllerBase
    {
        private readonly IContactoService _contactoService;

        public ContactoController(IContactoService contactoService)
        {
            _contactoService = contactoService;
        }

        // GET: api/<ContactoController>
        [HttpGet]
        public IActionResult Get()
        {
            var contactos = _contactoService.GetAll();
            return Ok(contactos);
        }

        // GET api/<ContactoController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var contacto = _contactoService.GetById(id);
            if (contacto == null)
            {
                return NotFound();
            }
            return Ok(contacto);
        }

        // POST api/<ContactoController>
        [HttpPost]
        public IActionResult Post([FromBody] Contacto contacto)
        {
            try
            {

                var contactoCreado = _contactoService.Add(contacto);
                if (contactoCreado != null) { 
                    return new ObjectResult(contactoCreado) { StatusCode = StatusCodes.Status201Created };
                }
                return Conflict("El usuario ya existe en la base de datos.");
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // PUT api/<ContactoController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Contacto contacto)
        {
            contacto.Id = id;
            var editado = _contactoService.Update(contacto);
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
            var eliminado = _contactoService.Delete(id);
            if(eliminado)
            {
                return Ok();
            }
            return NotFound();

        }
    }
}
