﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoApi.Models;

namespace ToDoApi.Controllers {
    [Route( "api/[controller]" )]
    [ApiController]
    public class TodoItemsController :ControllerBase {
        private readonly TodoContext _context;

        public TodoItemsController( TodoContext context ) {
            _context = context;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems() {
            return await _context.TodoItems.ToListAsync();
        }

        // GET: api/TodoItems/5
        [HttpGet( "{id}" )]
        public async Task<ActionResult<TodoItem>> GetTodoItem( int id ) {
            var todoItem = await _context.TodoItems.FindAsync( id );

            if ( todoItem == null ) {
                return NotFound();
            }

            return todoItem;
        }

        // PUT: api/TodoItems/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut( "{id}" )]
        public async Task<IActionResult> PutTodoItem( int id, TodoItem todoItem ) {
            if ( id != todoItem.Id ) {
                return BadRequest();
            }

            _context.Entry( todoItem ).State = EntityState.Modified;

            try {
                await _context.SaveChangesAsync();
            } catch ( DbUpdateConcurrencyException ) {
                if ( !TodoItemExists( id ) ) {
                    return NotFound();
                } else {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TodoItems
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem( TodoItem todoItem ) {
            _context.TodoItems.Add( todoItem );
            await _context.SaveChangesAsync();

            return CreatedAtAction( "GetTodoItem", new { id = todoItem.Id }, todoItem );
        }

        // DELETE: api/TodoItems/5
        [HttpDelete( "{id}" )]
        public async Task<ActionResult<TodoItem>> DeleteTodoItem( int id ) {
            var todoItem = await _context.TodoItems.FindAsync( id );
            if ( todoItem == null ) {
                return NotFound();
            }

            _context.TodoItems.Remove( todoItem );
            await _context.SaveChangesAsync();

            return todoItem;
        }

        private bool TodoItemExists( int id ) {
            return _context.TodoItems.Any( e => e.Id == id );
        }
    }
}
