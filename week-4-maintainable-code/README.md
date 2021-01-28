# Maintainable Code, Maintainable Projects

We ran this workshop with all of our interns (dev and PM), but it was much more discussion-based and activity-based. Here are some brief notes and examples we went through.

* [Warmup Examples](#warmup-examples)
* [General Discussion Topics](#general-discussion-topics)
* [Reflections From Matt](#reflections-from-matt)
* [Refactoring Code, Internal](#refactoring-code-internal)
  * [Static - CSS/SCSS](#static---cssscss)
  * [Editor (short) - JS/React](#editor-short---jsreact)
  * [Editor (long) - JS/React](#editor-long---jsreact)
* [Refactoring Code, External](#refactoring-code-external)
  * [JS - Banking (EJS)](#js---banking-ejs)
  * [React - Custom Hooks](#react---custom-hooks)
  * [React - HOC](#react---hoc)

## Warmup Examples

[Source: Refactoring JS](https://refactoringjs.com/)

```js
function byTwo(number){
  return number << 1;
}
```

[Source: Refactoring JS](https://refactoringjs.com/)

```js
function moreThanThree(number){
  if(number > 3){
    return true;
  } else {
    return "No. The number was only " + number + ".";
  }
};
```

[Source: "Ninja Code", Javascript.info](https://javascript.info/ninja-code)

```js
// taken from a well-known javascript library
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
```

[Source: "Ninja Code", Javascript.info](https://javascript.info/ninja-code)

```js
let user = authenticateUser();

function render() {
  let user = anotherValue();
  //
  //
  //
  signin(user);
}
```

[Source: "Bad Comments", Javascript.info](https://javascript.info/comments)

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

    // check if i is a prime number
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }

    alert(i);
  }
}

```

## General Discussion Topics

Some questions:

* what makes good code? what makes bad code?
* how important are "rules of thumb" to you?
* do you think there's always one right way to do something?

There are quite a few goals in software development:

* performance and efficiency
* readability
* writability
* maintanability
* testability
* parralelization
* paradigms (e.g. OOP, FP, etc.)
* and more!

Let's talk about some terms in software eng/dev (obviously non-exhaustive):

* refactor
* abstraction
* testing:
  * unit testing
  * test-driven development
* functional programming
  * side effect
  * pure function
* composition
* incremental development

## Reflections From Matt

This is a *pretty opinionated* section, and just the main points of what Matt will talk about. No detailed notes, sorry!

On general software dev:

* automation, CI/CD is great!
* Matt likes functional programming, but is not die-hard
* metrics are not an end goal, especially DRY and LOC
* good documentation is so important!!
* readability, writability, and efficiency are very different things
* refactor as you go - the boy scout rule!
* deep language knowledge pays dividends

On student projects:

* **code quality isn't as important as pushing code**
* small, incremental changes are great for morale and easier to CR
* cyclical nature of dev teams -> documentation, automated systems, handoff, etc.
* scale/scalability is almost never an issue
* service overload is very real; centralization helps!

On training and mentoring:

* soft deadlines (at least) are needed
* frequent check-ins are good :)
* training always takes longer than you think it does
* distinct roles are super important!
* practice makes permanent, but not perfect

## Refactoring Code, Internal

### Static - CSS/SCSS

[Source: static website](https://github.com/uclaacm/teach-la-website/blob/c914ada0230e00e74e86c85ab3828eec34956626/_sass/_basic.scss#L92)

```scss
.text-1x {
  font-size: 1rem !important;
}

.text-2x{
  font-size: 2em;
}

.text-15x{
  font-size: 1.5em;
}

.text-25x{
  font-size: 2.5em;
}
```

[Source: static website](https://github.com/uclaacm/teach-la-website/blob/c914ada0230e00e74e86c85ab3828eec34956626/_sass/_basic.scss#L224)

```scss
.schedule-table {
  border-collapse: collapse;
  width: 100%;

  tr {
    th, td {
      border-bottom: 2px solid black;
      text-align: center;
      padding: 3vw;
      padding-top: 15px;
      padding-bottom: 15px;

      @media (min-width: $desktop-width) {
          padding: 15px;
      }
    }

    &:nth-child(even) {
      background-color: $teachla-tint;
    }
  }
}
```

[Source: static website](https://github.com/uclaacm/teach-la-website/blob/c914ada0230e00e74e86c85ab3828eec34956626/_sass/_accountability.scss#L1).

```scss
.budget-table {
  border-collapse: collapse;
  width: 100%;

  tr {
    th, td {
      border-bottom: 2px solid black;
      padding-top: 15px;
      padding-bottom: 15px;

      @media (min-width: $desktop-width) {
        padding: 15px;
      }
    }

    th{
      font-weight: bold;
    }

    &:nth-child(even) {
      background-color: $teachla-tint;
    }
  }
}
```

[Source: static website](https://github.com/uclaacm/teach-la-website/blob/c914ada0230e00e74e86c85ab3828eec34956626/_sass/_basic.scss#L290)

```scss
*:target {
  padding-top: 70px;
  margin-top: -70px;
}
```

### Editor (short) - JS/React

[Source: Editor FE](https://github.com/uclaacm/TeachLAFrontend/blob/479fd75f846a1243191e920f94e9dc8d0a67189f/src/components/TextEditor/components/TextEditor.js#L215)

```jsx
renderDropdown = () => <DropdownButtonContainer />;
```

[Source: Editor FE](https://github.com/uclaacm/TeachLAFrontend/blob/479fd75f846a1243191e920f94e9dc8d0a67189f/src/components/Sketches/components/EditSketchModal.js#L41)

```jsx
badNameInput = () => {
  if (this.state.newName === -1) {
    return false;
  }
  if (!this.state.newName) {
    this.setState({ error: "Name is required" });
    return true;
  }
  if (this.state.newName.length > 15) {
    this.setState({ error: "Name must be 15 characters or less" });
    return true;
  }
  return false;
};
```

[Source: Editor FE](https://github.com/uclaacm/TeachLAFrontend/blob/479fd75f846a1243191e920f94e9dc8d0a67189f/src/components/common/Radio.js#L75)

```jsx
let optionStyle;
if (isSelected) {
  optionStyle = Object.assign(
    {},
    this.props.optionStyle || {},
    this.props.selectedOptionStyle || {},
    this.props.selectedBgColor ? { backgroundColor: this.props.selectedBgColor } : {},
    this.props.selectedColor ? { color: this.props.selectedColor } : {},
  );
} else {
  optionStyle = Object.assign(
    {},
    this.props.optionStyle || {},
    this.props.bgColor ? { backgroundColor: this.props.bgColor } : {},
    this.props.color ? { color: this.props.color } : {},
  );
}
```

[Source: Editor FE](https://github.com/uclaacm/TeachLAFrontend/blob/479fd75f846a1243191e920f94e9dc8d0a67189f/src/components/common/ProfilePanel.js#L101)

```jsx
renderErrorMessage = (msg, addBreak) => {
  if (msg)
    return (
      <span>
        <div className="profile-input-error">{msg}</div>
      </span>
    );

  return addBreak ? <br /> : null;
};
```

### Editor (long) - JS/React

[Source: Editor FE](https://github.com/uclaacm/TeachLAFrontend/blob/479fd75f846a1243191e920f94e9dc8d0a67189f/src/components/Sketches/components/EditSketchModal.js#L83)

```jsx
handleSubmitEdit = async (e) => {
  e.preventDefault();

  if (this.badNameInput() || this.badLanguageInput()) {
    // note it's impossible to have a bad thumbnail input
    return;
  }

  let data = {};
  let doUpdate = false;

  if (this.state.newLanguage !== -1) {
    data.language = this.state.newLanguage.value;
    doUpdate = true;
  }
  if (this.state.newName !== -1) {
    data["name"] = this.state.newName;
    doUpdate = true;
  }
  if (this.state.newThumbnail !== -1) {
    data["thumbnail"] = this.state.newThumbnail;
    doUpdate = true;
  }
  if (doUpdate) {
    let updateData = {};
    updateData[this.props.sketchKey] = data;
    try {
      fetch
        .updatePrograms(this.props.uid, updateData)
        .then((res) => {
          if (res.ok) {
            if (this.state.newLanguage !== -1) {
              this.props.setProgramLanguage(this.props.sketchKey, this.state.newLanguage.value);
            }
            if (this.state.newName !== -1) {
              this.props.setProgramName(this.props.sketchKey, this.state.newName);
            }
            if (this.state.newThumbnail !== -1) {
              this.props.setProgramThumbnail(this.props.sketchKey, this.state.newThumbnail);
            }
            this.closeModal();
          } else {
            this.setState({
              disableSubmit: false,
              error: res.text() || "Failed to edit sketch, please try again later",
            });
            return;
          }
        })
        .catch((err) => {
          this.setState({
            disableSubmit: false,
            error: "Failed to edit sketch, please try again later",
          });
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    this.setState({ disableSubmit: true, error: "" });
  } else {
    this.closeModal();
  }
};
```

[Source: Editor FE](https://github.com/uclaacm/TeachLAFrontend/blob/479fd75f846a1243191e920f94e9dc8d0a67189f/src/components/Main.js#L88)

```jsx
renderEditor = () => (
  <EditorAndOutput
    // view mode
    viewMode={this.state.viewMode}
    updateViewMode={(viewMode) => this.setState({ viewMode })}
    // theme
    theme={this.props.theme}
    // sizing
    left={this.props.left}
    screenWidth={this.props.screenWidth}
    screenHeight={this.props.screenHeight}
    // view only trigger
    viewOnly={false}
    // pane
    panelOpen={this.props.panelOpen}
    pane1Style={this.state.pane1Style}
    changePane1Style={(newStyle) => this.setState(newStyle)}
    // program information
    mostRecentProgram={this.props.mostRecentProgram}
    language={this.props.language}
    code={this.props.code}
    programid={this.props.programid}
    sketchName={this.props.sketchName}
    // save handler
    saveText={this.state.saveText}
    handleSave={this.handleSave}
  />
);
```

[Source: Editor FE](https://github.com/uclaacm/TeachLAFrontend/blob/479fd75f846a1243191e920f94e9dc8d0a67189f/src/components/Login.js#L88)

```jsx
render = () => {
  const textHighlightStyle = {
    background: `linear-gradient(180deg, rgba(255,255,255,0) 80%, ${
      gradientColors[this.state.index][0]
    } 50%)`,
  };
  return (
    <div className="login-page-content">
      <div className="login-page-content-container">
        <div
          className="bottom-right-toggle"
          onClick={() => this.setState({ index: Math.floor(Math.random() * 5) })}
        >
          <FontAwesomeIcon icon={faRedo} />
        </div>
        <div className="login-page-content-main">
          <div>
            <h1 className="font-weight-bold">
              The ACM <span className="teachla-green">Teach LA</span>{" "}
              <span style={textHighlightStyle}>Online Editor</span>
            </h1>
            <p>a web IDE that lets you write and run Python &amp; Processing code, anywhere.</p>
            {this.props.create ? (
              <CreateUserForm
                initialState={this.props.initialState}
                themeColor={themeColors[this.state.index][0]}
                textColor={themeColors[this.state.index][2]}
              />
            ) : (
              <LoginForm
                themeColor={themeColors[this.state.index][0]}
                textColor={themeColors[this.state.index][1]}
              />
            )}
          </div>
        </div>
        <div className="login-page-content-footer">
          <FontAwesomeIcon icon={faPaintBrush} /> <FontAwesomeIcon icon={faCode} />{" "}
          <FontAwesomeIcon icon={faRocket} /> by{" "}
          <a href="https://teachla.uclaacm.com" target="_blank" rel="noopener noreferrer">
            <span className="teachla-green">ACM Teach LA</span>
          </a>{" "}
          with <FontAwesomeIcon className="beating-heart" icon={faHeart} />
        </div>
        <div className="login-page-images">
          <img
            className="login-page-art"
            src={loginArt[this.state.index]}
            alt={`decorative login page art: ${loginArtAlts[this.state.index]}`}
          />
          {this.getSVG()}
        </div>
      </div>
    );
  };
}
```

[Source: Editor FE](https://github.com/uclaacm/TeachLAFrontend/blob/479fd75f846a1243191e920f94e9dc8d0a67189f/src/components/TextEditor/components/TextEditor.js#L69)

```jsx
checkDirty = async () => {
  if (!this.props.dirty) {
    return;
  }

  try {
    let programToUpdate = {};
    programToUpdate[this.props.mostRecentProgram] = {
      code: this.props.code,
    };

    await fetch.updatePrograms(this.props.uid, programToUpdate);
    //TODO: add functionality to be able to tell whether the fetch failed
  } catch (err) {
    console.log(err);
  }
};
```


## Refactoring Code, External

### JS - Banking (EJS)

[Source: "Cleaning Up After Exceptions", Eloquent JavaScript](https://eloquentjavascript.net/08_error.html)

```js
const accounts = {
  a: 100,
  b: 0,
  c: 20
};

function getAccount() {
  let accountName = prompt("Enter an account name");
  if (!accounts.hasOwnProperty(accountName)) {
    throw new Error(`No such account: ${accountName}`);
  }
  return accountName;
}

function transfer(from, amount) {
  if (accounts[from] < amount) return;
  accounts[from] -= amount;
  accounts[getAccount()] += amount;
}
```

### React - Custom Hooks

[Source: "Building Your Own Hooks"](https://reactjs.org/docs/hooks-custom.html)

```jsx
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

```jsx
import React, { useState, useEffect } from 'react';

function FriendListItem(props) {
  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

### React - HOC

[Source - "Higher Order Components"](https://reactjs.org/docs/higher-order-components.html)

```jsx
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" is some global data source
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // Subscribe to changes
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Clean up listener
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Update component state whenever the data source changes
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}
```

```jsx
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}
```
