using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ToDoList.Models;
using System.Web.Http.Cors;
 

namespace ToDoList.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers:"*", methods:"*")]

    public class ListsController : ApiController
    {
        private ToDoListEntities db = new ToDoListEntities();

        // GET: api/Lists
        public IQueryable<List> GetList()
        {
            List<ModelList> Lista = db.List.Select(s => new ModelList()
                {
                    iKeyList = s.KeyList,
                    Titulo = s.Titulo,
                    Descripcion = s.Descripcion,
                    FechaCreacion = s.FechaCreacion,
                    Terminado = s.Terminado,
                }).ToList();
            return db.List;
        }

        // GET: api/Lists/5
        [ResponseType(typeof(List))]
        public IHttpActionResult GetList(Guid id)
        {         
            try
            {
               

                return Ok(id);
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                {
                    return BadRequest(ex.InnerException.Message);
                }
                else
                {
                    return BadRequest(ex.Message);
                }
            }
            

        }

        // PUT: api/Lists/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutList(Guid id, List list)
        {
            using (var x = new ToDoListEntities())
            {
                var BuscarListaExistente = x.List.Where(c => c.KeyList == list.KeyList).FirstOrDefault<List>();

                if (BuscarListaExistente != null)
                {
                    BuscarListaExistente.Titulo = list.Titulo;
                    BuscarListaExistente.Descripcion = list.Descripcion;
                    BuscarListaExistente.FechaCreacion = list.FechaCreacion;
                    BuscarListaExistente.Terminado = list.Terminado;

                    x.SaveChanges();
                }
                else
                    return NotFound();
            }
            return Ok();

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

            if (id != list.KeyList)
            {
                return BadRequest();
            }

            db.Entry(list).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Lists
        [ResponseType(typeof(List))]
        public IHttpActionResult PostList(List list)
        {
            try
            {
                Guid newID = Guid.NewGuid();

                Models.List NuevaLista = new Models.List()
                {
                    KeyList = newID,
                    Titulo = list.Titulo,
                    Descripcion = list.Descripcion,
                    FechaCreacion = list.FechaCreacion,
                    Terminado = list.Terminado,
                };

                db.List.Add(NuevaLista);
                db.SaveChanges();

                return Ok(list);
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                {
                    return BadRequest(ex.InnerException.Message);
                }
                else
                {
                    return BadRequest(ex.Message);
                }
            }

            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //db.List.Add(list);

            //try
            //{
            //    db.SaveChanges();
            //}
            //catch (DbUpdateException)
            //{
            //    if (ListExists(list.KeyList))
            //    {
            //        return Conflict();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            //return CreatedAtRoute("DefaultApi", new { id = list.KeyList }, list);
        }

        // DELETE: api/Lists/5
        [ResponseType(typeof(List))]
        public IHttpActionResult DeleteList(Guid id)
        {
            List list = db.List.Find(id);
            if (list == null)
            {
                return NotFound();
            }

            db.List.Remove(list);
            db.SaveChanges();

            return Ok(list);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ListExists(Guid id)
        {
            return db.List.Count(e => e.KeyList == id) > 0;
        }
    }
}