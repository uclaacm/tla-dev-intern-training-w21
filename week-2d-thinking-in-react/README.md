# Week 2 (Dev) - Thinking in React

Here are Matt's notes for the relatively erratic "thinking in react" workshop for Teach LA's '21 dev interns!

## Table of Contents

* [Blitzing over React basics](#blitzing-over-react-basics)
* [Functional programming in React](#functional-programming-in-react)
  * [map, filter, reduce](#map-filter-reduce)
    * [Array.prototype.map()](#arrayprototypemap)
    * [Array.prototype.filter()](#arrayprototypefilter)
    * [Array.prototype.reduce()](#arrayprototypereduce)
  * [Higher-order functions and two-way state](#higher-order-functions-and-two-way-state)
  * [Composition](#composition)
  * [Containment](#containment)
  * [Composition versus Inheritance](#composition-versus-inheritance)
  * [Partial application and 'currying'](#partial-application-and-currying)
* [Classes versus Hooks](#classes-versus-hooks)
  * [JS Classes (and why they're not like OOP)](#js-classes-and-why-theyre-not-like-oop)
  * [useEffect versus component lifecycle](#useeffect-versus-component-lifecycle)
* [Misc. React](#misc-react)
  * [React Router](#react-router)
  * [Why Redux (or others)](#why-redux-or-others)
  * [CRA Goodies](#cra-goodies)
* [Conclusion](#conclusion)
* [Licensing](#licensing)

## Blitzing over React basics

In this section, Matt basically recaps everything from the QWER Hacks tutorial videos. For written notes, please check out the [QWER Hacks '21 React 101 Workshop](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/react/main-workshop).

## Functional programming in React

One of the defining features of JavaScript is that it's a **functional programming**. We won't delve too deeply into the theory here - that's a conversation for another day, maybe CS 131 - but we'll highlight some of the practical applications and why they're useful.

With regards to React, functional programming lets us do a few things:

* treating functions like data allows for great reusability and composition
* as components are functions, the above benefits also apply to components
* functional programming can reduce the complexity of our app, and isolate/compartmentalize when needed
* we get to dodge JavaScript classes (a tricky topic)

Let's get started!

### map, filter, reduce

Map, filter, and reduce are a set of functions in JavaScript that operate on lists/arrays. They're particularly popular paradigms in many functional languages, because they abide by functional rules (pure functions) and make code easy to read. Let's take each of these for a spin, in React!

#### Array.prototype.map()

We can start with `Array.prototype.map()`. The name of this function comes from math; often times, we'll call a function a "map" from one domain to another, applying some transformation to each element in the domain. Conceptually, that's what `.map()` does too (but if this didn't make sense, don't worry about it)!

Let's walk through a very trivial example.

```js
const double = (x) => 2 * x;
const primes = [2,3,5,7,11];

console.log(primes.map(double));
// [4,6,10,14,22];
```

What's going on here? `.map()` gets called on one list, and returns a list of the same size. To build the new list, it applies the function to every element in the list. In this case, we're applying `double` to every item in `primes`; we're element-wise doubling the list!

By itself, this is a really powerful tool. Even though this example is trivial, the concept of "element-wise" operation is very useful for a wide variety of CS problems.

What about a React example? Here's an extremely common use of `.map()`: generating lists of components from some data.

```jsx
const users = [
  {
    username: "laundromatt",
    email: "matt@matthewwang.me"
  },
  {
    username: "krashanoff",
    email: "leo@krashanoff.com"
  },
  ...
];

const mappedUsers = users.map((user) => {
  return <User username={user.username} email={user.email} key={user.username} />
});

console.log(mappedUsers);
// <User username={"laundromatt"} email={"matt@matthewwang.me"} key={"laundromatt"} />
// <User username={"krashanoff"} email={"leo@krashanoff.com"} key={"krashanoff"} />
```

This is the de-facto way to generate sets of components.

One thing I'll note is the `key` parameter: if you create a list of components, you need to add a `key`. This is a special prop that's used to create what's called a "stable identity" for each component - a way for React to know what component is what.

The only thing I'll note about keys is, if you can, **try to avoid using array indexes as keys**. This is because indexes can change (as the array changes sizes), which means React has to re-key things. Instead, try to use something that won't change in the array - like a username. More on keys [in the React docs](https://reactjs.org/docs/lists-and-keys.html#keys).

#### Array.prototype.filter()

Hopefully, `.filter()`'s name is suggestive: we can call it on an array, and "filter" out/in elements. Let's start with a quick JS-only example:

```js
const even = (x) => x % 2 == 0;
const primes = [2,3,5,7,11];

const evenPrimes = primes.filter(even);
console.log(evenPrimes);
// [ 2 ]
```

You may be able to guess, but `.filter()` also takes an array and returns a different array. We still pass a function to `.filter()`, but this time the return value is a *boolean* that decides whether or not we should include the item in the next array.

By itself, this can be a useful tool; however, it's often combined with `.map()`, in a map-filter or filter-map approach. Consider this:

```jsx
const tasks = [
  {
    task: "do hwk",
    urgent: true,
  },
  {
    task: "write this workshop",
    urgent: true,
  },
  {
    task: "enjoy life",
  }
];

const urgentTasks = tasks.filter((task) => task.urgent);

const urgentComponents = urgentTasks.map((task) => {
  return <Task task={task.task} />
})
// <Task task="do hwk" />, <Task task="write this workshop" />
```

Now you've got another tool in your functional toolbox! Let's do one more :)

#### Array.prototype.reduce()

`.reduce()` is the most confusing of our motley trio. Let's start with a few examples:

```js
const sum = (x,y) => x + y;
const primes = [2,3,5,7,11];

const sum_of_primes = primes.reduce(sum, 0);
// 28

const ageSum = (accum, person) => accum + person.age;
const peeps = [
  {
    name: "matt",
    age: 20,
  },
  {
    name: "jared",
    age: 19,
  },
  {
    name: "aang",
    age: 112,
  }
];

const sum_of_ages = peeps.reduce(ageSum, 0);
// 151

const ageConcat = (accum, person) => accum + person.name;
const concat_of_names = peeps.reduce(ageConcat, "");
// "mattjaredaang" (but don't rely on this behaviour!)
```

Intuitively, reduce can operate over arrays too! Unlike the others, `reduce` can return anything - and typically it returns just one value. How this value is determined is as follows:

1. start with the default value, the **second parameter** to `.reduce()`
2. from left to right, apply the function to the item in the element; update the accumulator with the return value

This is a quite powerful tool! Let's take a look at two short React examples:

```jsx
const posts = [
  {
    text: "evan is so cool!",
    likes: 420,
  },
  {
    text: "is evan william?",
    likes: 42,
  },
];

const postAccum = (accum, post) => accum + post.likes;
const totalLikes = posts.reduce(postAccum, 0);
// 462

const bestPostCheck = (accum, post) => {
  post.likes > accum.likes ? post : accum
};
const bestPost = posts.reduce(bestPostCheck, {text:"test", likes: 0});
// {
//   text: "evan is so cool!",
//   likes: 420,
// },
```

In the first example, we use the reducer somewhat traditionally: we sum up (or accumulate) the number of likes over all of the posts. In the second example, we use it to find the post with the most likes; our accumulator stores the best post that we find.

Hopefully now you've got a good understanding of `.map(), .filter(), .reduce()` and how you can use it to manipulate lists of data and components. You'll use these patterns all the time when dealing with complex data in React, and these tools help you do it cleanly!

### Higher-order functions and two-way state

"Higher-order function" sounds scary, but we've actually already used it in our previous section! A higher-order function is just a function that gets passed to another function. This is a key component of functional programming in general, but moreover, is particularly helpful in JavaScript with React.

One very common operation you'll have to do is to update a parent component's state from a child. There are quite a few ways to do this - including global immutable state abstractions like Redux or MobX - but a simple way involves passing down the `setState` function.

Here's a toy example:

```jsx
import {useState} from 'react'
function App() {
  const [counter, setCounter] = useState(0);
  const nums = [1,2,4,8];

  return (
    <div>
      current counter: {counter}
      {nums.map((num) =>
        <Buttons
          current={counter}
          setCounter={setCounter}
          num ={num}
        />)}
    </div>
  )

}

function Buttons(props) {
  const { current, setCounter, num } = props;
  return (
    <div>
      <button onClick={setCounter(current - num)}>-{num}</button>
      <button onClick={setCounter(current + num)}>+{num}</button>
    </div>
  )
}
```

Is this a slightly confusing example? Maybe, haha, but it demonstrates a very common design pattern - passing down the current state and the `setState` function to a child component, who can use it to handle their own business logic and update the parent when needed.

In this example, we can also see a decoupling of responsibilties: `App` doesn't have to know what `Buttons` does to calculate its updates, just what the updates are. This can make components more interchangeable and allows for better composition. Decoupling logic between components is one of the strengths of React!

### Composition

*This section is heavily adapted from [React's documentation on this topic](https://reactjs.org/docs/composition-vs-inheritance.html), because Matt thinks it's really well-written.*

Composition is one of the key tenets of functional programming. Without delving too deeply into the theory, we'll go over some common uses of it.

### Containment

One super-useful but often unused feature in React is that components can contain each other. In particular, this means that not all elements need to be self-closing. Let's take a look at the example from the [React docs](https://reactjs.org/docs/composition-vs-inheritance.html)

```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

That's right! The special `props.children` argument lets you use what's *inside* the component that you define. This allows for you to define components that still do small, bite-sized things (like adding a fancy border, an alert, or a highlight), without having to bundle all of that logic into one monolith component.

### Composition versus Inheritance

Let's say you need to make a special case or a custom version of a component. There are two approaches you can take here:

* an **inheritance-based** approach, which makes a root class, and then *extends* its properties to a newer class. This is likely what you learned in CS31/CS32.
* a **composition-based** approach, which makes a generic component, and then has specialized versions *configure* it with props

These two ... sound kinda similar, but they actually have different theoretical backgrounds and practical benefits in the realm of maintainability. In particular, note which "version" of the component has the entire featureset:

* in the inheritance approach, **the extended class contains the full featureset of the component**. There could be many different extensions of the same class.
* in the composition approach, **the generic component contains the full featureset of the component**. All extensions must conform to the generic version (or at least, parts of it).

As you can guess, React (and arguably, JS in general) prefers composition.

Taking an example out of the [React docs](https://reactjs.org/docs/composition-vs-inheritance.html), let's say we need to make a custom `WelcomeDialog` component. Here is how React's creators say you should do it:

```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```

I'll end with a quote from the docs:

> At Facebook, we use React in thousands of components, and we haven’t found any use cases where we would recommend creating component inheritance hierarchies.

### Partial application and 'currying'

*Matt thanks [Ben Alman's blog post](http://benalman.com/news/2012/09/partial-application-in-javascript/) for inspiring some of the examples*.

Another popular feature of functional programming is partial application (and its related form, currying). Without diving into the theoretical details, this is basically a way for us to create versions of functions where some of the arguments are "prefilled", or "partially applied".

JavaScript doesn't support partial application to the same extent that languages like OCaml or Haskell do. However, there are some neat tricks you can do:

```js
// basic partial application
const add = (a,b) => a + b;
const addOne = (b) => add(1,b);

// let's go ham with closures
const createAdder = (a) => {
  return function(b) {
    return a + b;
  }
}

// now, we can make as many adders as we want
const add42 = createAdder(42);
const add100 = createAdder(100);
console.log(add42(21)); // 63
console.log(add100(100)); // 200
```

There's actually quite a bit more we can do with partial application, like creating custom partial application factories - but we'll pause on that for now. Why is this useful for React?

For one, it's very common when we do things like passing state down:

```jsx
function TwitterApp() {
  const [tweets, setTweets] = useState([]);
  const [author, setAuthor] = useState("");
  const newTweet = (author, text) => {
    setTweets([...tweets].concat([{author: author, text: text}]));
  }
  return (
    <TweetCreator createTweet={(text) => newTweet(author, text)} />
  )
}
```

In this example, we're partially applying the first argument of `newTweet` to make a new function. This is a very common pattern that you'll see a lot!

There are more complex constructs out there - I would suggest checking out [Ben Alman's blog post for more info](http://benalman.com/news/2012/09/partial-application-in-javascript/) - but for our purposes, I'll end here.

*Skip this if you don't care about FP that much! It's not too important.*

Functional programming enthusiasts might ask two things:

1. is partial application efficient?
2. what about currying?

Without explicitly diving into both of these questions, the short answer is kinda and no. Functions in JavaScript are first-class citizens, but they don't work the same way internally as languages like Haskell and OCaml. In particular, many common optimizations - tail-call/tail-recursion optimization, strict argument enforcement, mutability guarantees, etc. - don't actually exist in JS. The version of partial application that we introduced involves [closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures); true currying isn't really supported in JavaScript, because the amount of arguments a function can have is not fixed (and it's also not how the language was designed, leading to unoptimal code). I'd encourage you to look more into this yourself; I (matt) am definitely not an absolute expert in this field!

## Classes versus Hooks

Matt discusses the class-based versus hooks-based approaches to writing React components, and some of their upsides and downsides.

### JS Classes (and why they're not like OOP)

Moved to another week.

### useEffect versus component lifecycle

Moved to another week.

## Misc. React

Moved to another week.

### React Router

### Why Redux (or others)

### CRA Goodies

## Conclusion

Moved to another week.

## Licensing

The contents of this repository are dual-licensed under the [MIT License](https://github.com/uclaacm/tla-dev-intern-training-w21/blob/main/LICENSE) and the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/); feel free to use whichever license suits your purpose better.

We'd love to hear if you found this helpful, or if you have any suggestions! Please send matt an email at [matt@matthewwang.me](mailto:matt@matthewwang.me) or reach out to him on the ACM / Teach LA slack!
