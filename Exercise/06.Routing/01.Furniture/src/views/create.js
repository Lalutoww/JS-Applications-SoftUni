import { html } from '../../node_modules/lit-html/lit-html.js';
import { createFact } from '../api/data.js';

const createTemplate = (submitHandler) => html`<section id="create">
   <div class="form">
      <h2>Add Fact</h2>
      <form class="create-form" @submit=${submitHandler}>
         <input
            type="text"
            name="category"
            id="category"
            placeholder="Category"
         />
         <input
            type="text"
            name="image-url"
            id="image-url"
            placeholder="Image URL"
         />
         <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="10"
            cols="50"
         ></textarea>
         <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="10"
            cols="50"
         ></textarea>
         <button type="submit">Add Fact</button>
      </form>
   </div>
</section>`;

export function showCreate(ctx) {
   ctx.render(createTemplate(onSubmit));

   async function onSubmit(event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);

      if (
         !data.category ||
         !data.description ||
         !data['additional-info'] ||
         !data['image-url']
      ) {
         return;
      }

      const result = {
         category: data.category,
         imageUrl: data['image-url'],
         description: data.description,
         moreInfo: data['additional-info'],
      };
      try {
         await createFact(result);
         ctx.page.redirect('/dashboard');
      } catch (err) {
         console.log(err.message);
      }
   }
}
