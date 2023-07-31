import { html, nothing } from '../../node_modules/lit-html/lit-html.js'; // nothing is a special symbol in lit-html
import { deleteFactById, getFactById, getAllLikesByFactId, getAllLikesByFactIdAndUserId, likeFactById } from '../api/data.js';

const detailsTemplate = (fact, likes, user, isAlreadyLiked, onDelete, onLike) => {
   const isCreator = fact._ownerId === user?._id; //if user has _id only then return true if not => return false

   return html`
      <section id="details">
         <div id="details-wrapper">
            <img id="details-img" src="${fact.imageUrl}" alt="example1" />
            <p id="details-category">${fact.category}</p>
            <div id="details-description">
               <p id="description">${fact.description}</p>
               <p id="more-info">${fact.moreInfo}</p>
            </div>
            <h3>Likes:<span id="likes">${likes}</span></h3>
            ${user
               ? html`<div id="action-buttons">
                       ${!isCreator && !isAlreadyLiked
                          ? html`<a href="" id="like-btn" @click=${onLike}>Like</a>`
                          : nothing}
                       ${isCreator
                          ? html`
                               <a href="/edit/${fact._id}" id="edit-btn">Edit</a>
                               <a href="" id="delete-btn" @click=${onDelete}>Delete</a>`
                          : nothing}
                    </div>`
               : nothing}
         </div>
      </section>
   `;
};

export async function showDetails(ctx) {
   const factId = ctx.params.id;
   const fact = await getFactById(factId);
   const likes = await getAllLikesByFactId(factId);

   let isAlreadyLiked = false;

   if (ctx.user) {
      isAlreadyLiked = !!(await getAllLikesByFactIdAndUserId(
         factId,
         ctx.user._id
      ));
   }

   ctx.render(detailsTemplate(fact, likes, ctx.user, isAlreadyLiked, onDelete, onLike));

   async function onLike(e) {
      try {
         console.log(e.target);
         likeFactById({ factId: fact._id });

         ctx.page.redirect('/details/' + factId);
      } catch (err) {
         console.log(err.message);
      }
   }

   async function onDelete() {
      try {
         if(confirm('Are you sure you want to delete this fact ?')) await deleteFactById(factId);

         ctx.page.redirect('/dashboard');
      } catch (err) {
         console.log(err.message);
      }
   }
}
