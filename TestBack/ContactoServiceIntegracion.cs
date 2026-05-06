using back.Controllers;
using back.Core.Entity;
using back.Core.Interfaces;
using back.Repositories;
using back.Services;
using Microsoft.AspNetCore.Mvc;

namespace TestBack;

[TestClass]
public class ContactoServiceIntegracion
{
    private  IContactoRepository _contactoRepository;
    private  IContactoService _contactoService;
    private  ContactoController _contactoController;

    [TestInitialize]
    public void Setup()
    {
        // Repositorio real en memoria
        _contactoRepository = new ContactoRepository();
        _contactoService = new ContactoService(_contactoRepository);
        _contactoController = new ContactoController(_contactoService);
    }

    [TestMethod]
    public async Task GetContactById_ShouldReturnOkResult_WhenContactExists()
    {
        // Arrange: insertar contacto en el repositorio real
        var contact = new Contacto { Nombre = "Claudio", Telefono = "123456789" };
        await _contactoRepository.Add(contact);
        // Act: llamar al controlador
        var result = await _contactoController.Get(1);

        // Assert: verificar respuesta
        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        var returnedContact = okResult.Value as Contacto;
        Assert.IsNotNull(returnedContact);
        Assert.AreEqual("Claudio", returnedContact.Nombre);
        Assert.AreEqual("123456789", returnedContact.Telefono);
    }

    [TestMethod]
    public async Task GetContactById_ShouldReturnNotFound_WhenContactDoesNotExist()
    {
        // Act
        var result = await _contactoController.Get(99);

        // Assert
        Assert.IsInstanceOfType(result, typeof(NotFoundResult));
    }
}
