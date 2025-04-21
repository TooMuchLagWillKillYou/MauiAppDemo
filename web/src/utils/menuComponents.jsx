const Page = (props) => <div {...props} className="page" />;
const PageTitle = (props) => <p {...props} className="pageTitle" />;
const Container = (props) => <div {...props} className="menuItemsContainer" />;
const PizzaGroup = (props) => (
  <div className="pizzaGroup">
    <div className="pizzaHeader">
      <p className="pizzaName">{props.name}</p>
      <p className="pizzaPrice">{props.price}</p>
    </div>
    <p className="pizzaIngredients">{props.ingredients}</p>
  </div>
);
export { Page, PageTitle, Container, PizzaGroup };
