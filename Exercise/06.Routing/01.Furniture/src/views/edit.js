import { html } from '../../node_modules/lit-html/lit-html.js';
import { getFactById, updateFactById } from '../api/data.js';

const editTemplate = (fact, onEdit) => html`
   <section id="edit">
<div class="form">
  <h2>Add Fact</h2>
  <form class="edit-form" @submit=${onEdit}>
    <input
      type="text"
      name="category"
      id="category"
      placeholder="Category"
      value="${fact.category}"
    />
    <input
      type="text"
      name="image-url"
      id="image-url"
      placeholder="Image URL"
      value="${fact.imageUrl}"
    />
    <textarea
    id="description"
    name="description"
    placeholder="Description"
    rows="10"
    cols="50">${fact.description}</textarea>
  <textarea
    id="additional-info"
    name="additional-info"
    placeholder="Additional Info"
    rows="10"
    cols="50">${fact.moreInfo}</textarea>
    <button type="submit">Add Fact</button>
  </form>
</div>
</section>
`;

export async function showEdit(ctx) {
   const fact = await getFactById(ctx.params.id); //Get ID using page context => .../:id

   ctx.render(editTemplate(fact, onEdit));

   async function onEdit(event) {
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
        console.log('here')
         await updateFactById(ctx.params.id, result);

         ctx.page.redirect('/data/facts/' + ctx.params.id);
      } catch (err) {
         console.log(err.message);
      }
   }
}
