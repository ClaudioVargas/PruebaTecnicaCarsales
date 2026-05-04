using back.Controllers;
using back.Core.Entity;
using back.Core.Interfaces;
using back.Repositories;
using back.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.ApplicationInsights.MetricDimensionNames.TelemetryContext;

namespace TestBack;

[TestClass]
public class ContactoServiceTest
{
    private readonly IContactoRepository _contactoRepository;
    private readonly IContactoService _contactoService;
    private readonly ContactoController _contactoController;


    private TestContext testContextInstance;


    public ContactoServiceTest()
    {
        _contactoRepository = new ContactoRepository();
        _contactoService = new ContactoService(_contactoRepository);
        _contactoController = new ContactoController(_contactoService);

    }


    [TestMethod]
    public async Task CrearContacto()
    {
        // Arrange
        var contacto = new Contacto { Nombre = "Juan", Telefono = "123456789" };
        // Act
        var resultado = await _contactoService.Add(contacto);


        // Arrange
        var contacto2 = new Contacto { Nombre = "Pedro", Telefono = "123456789" };
        // Act
        var resultado2 = await _contactoService.Add(contacto2);


        TestContext.WriteLine("Contacto creado: " + resultado?.ToString());
        TestContext.WriteLine("Contacto creado: " + resultado2?.ToString());
        // Assert
        Assert.IsNotNull(resultado, "El contacto no se creó correctamente.");
        Assert.IsNull(resultado2, "El segundo contacto debería ser nulo debido a la duplicación de teléfono.");
    }

    //[TestMethod]
    //public async Task ValidarContactoDuplicado()
    //{
    //    // Arrange
    //    var contacto1 = new Contacto { Nombre = "Juan", Telefono = "123456789" };
    //    IActionResult resultado1 = await _contactoController.Post(contacto1);
    //    var okResult = resultado1 as OkObjectResult;
    //    TestContext.WriteLine("usuario 1"+ okResult?.Value);
    //    //TestContext.WriteLine("usuario 1"+ okResult?.Value?.ToString());
    //    // Act
    //    var contacto2 = new Contacto { Nombre = "Maria", Telefono = "123456789" };
    //    IActionResult resultado2 = await _contactoController.Post(contacto2);
    //    var okResult2 = resultado2 as OkObjectResult;
    //    TestContext.WriteLine("usuario 2"+ okResult2?.Value);
    //    // Assert
    //    Assert.IsNotNull(resultado1, "El primer contacto no se creó correctamente.");
    //    Assert.IsNull(resultado2, "El segundo contacto debería ser nulo debido a la duplicación de teléfono.");
    //}

    [TestMethod]
    public async Task GetAll()
    {

        IActionResult resultado = await _contactoController.Get();
        var okResult = resultado as OkObjectResult;
        TestContext.WriteLine("Todos los contactos: " + okResult?.Value);

        // Assert
        Assert.IsNotNull(resultado, "Debe obtener una lista vacia si no hay contactos");
    }

    public TestContext TestContext
    {
        get { return testContextInstance; }
        set { testContextInstance = value; }
    }
}
