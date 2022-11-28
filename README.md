# Js Bottomsheet
A pure Js snappable, scrollable, customisable bottomsheet!

## Features
- Works as a modal in web and as a bottomsheet in mobile.
- Supports multiple snap points.
- Spring animations.
- Supports stacking of bottomsheets.
- Is scrollable at the last snappoint.
- Supports dynamic content.

##Installation

## Usage

Here's a simple usage of the bottomsheet with static content.

HTML:
```
  <button id="trigger-1" data-bottomsheet-id='bottomsheet-1'>click</button>
  <div id="bottomsheet-1" data-bottomsheet>The Bottomsheet</div>
```

The trigger should have an ID which would be used in the initialisation of the bottomsheet, and a data attribute containing the ID referring to 
it's corresponding bottomsheet ```data-bottomsheet-id=[id]```. 
The bottomsheet should have the ID as well as the data attribute ```data-bottomsheet```

JS:
```
BottomSheet({
  trigger: 'trigger-1',
});
```
This would create a simple bottomsheet with the default props.

## Props:

 ### trigger:
 The Id of the trigger element.
 > Type: string
 
 ### snapPoints:
 An array of all the snappoints percentages you'd like the bottomsheet to snap at, from bottom to top.
 > Type: Array of strings
 
 > Default: ['100%']
 
 eg: 
 ```
 BottomSheet({
  trigger: 'trigger-1',
  snappoints: ['20%', '60%', '100%']
});
```
### content:
Your content needn't always be a DOM element, it could be passed in dynamically too, as a string or as a promise.
> Type: string | promise

 eg: 
 ```
 BottomSheet({
  trigger: 'trigger-1',
  content: <div id="bottomsheet-1" data-bottomsheet>The Bottomsheet</div>
});
```

### displayOverlay:
A boolean defining whether to display an overlay or not.
> Type: Boolean

> Default: false


### draggableArea:
An area which would be sticky to the top of the sheet and would always listen to drag events, even if the content of the sheet is scrollable. It should have an ID.
> Type: string.

eg: 

 ```
 BottomSheet({
  trigger: 'trigger-1',
  content: <div id="bottomsheet-1" data-bottomsheet>The Bottomsheet</div>,
  draggableArea: `<div id="drag"><svg  width="45" height="7" viewBox="0 0 45 7" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="45" height="7" rx="3.5" fill="#38383D"/></svg></div>`,
});
```

### minWidthForModal:
The minimum width at which you'd like a modal to appear.
> Type: number

> Default: 700

### openOnLoad:
This property helps the bottomsheet to be open on load, without a trigger. Since there is no trigger, content is required to be passed in dynamically.
> Type: boolean

> Default: false

eg:

```
 BottomSheet({
  content: `<div id="maps-1" data-bottomsheet>The bottomsheet</div>`,
  openOnLoad: true,
});
```

### modalCloseIcon
Close icon for the modal in web.
> Type: string 

> Default: 
```
`<svg width="16" height="12" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M33.112 36.9133C34.3649 38.15 36.3963 38.15 37.6492 36.9133C38.9022 35.6766 38.9022 33.6716 37.6492 32.435L24.0375 19L37.6492 5.56496C38.9022 4.3283 38.9022 2.32328 37.6492 1.08662C36.3963 -0.150042 34.3649 -0.150042 33.112 1.08662L19.5002 14.5216L5.88835 1.08655C4.63541 -0.150108 2.60401 -0.150107 1.35108 1.08655C0.0981471 2.32321 0.0981459 4.32824 1.35108 5.5649L14.9629 19L1.35108 32.435C0.0981434 33.6717 0.0981443 35.6767 1.35108 36.9134C2.60401 38.15 4.63541 38.15 5.88834 36.9134L19.5002 23.4783L33.112 36.9133Z" fill="white"/>
 </svg>`
 ```
 
 ### cleanUpOnClose
Removing the Bottomsheet from the DOM on closing it can be done with this prop.

> Type: boolean

> Default: false

### dismissible
Determines whether the bottomsheet is dismissible or not.
> Type: boolean

> Default: true

### velocityThreshold
The velocity greater than which the bottomsheet would be snappable to the next snappoint, otherwise it would snap back to the old one.
> Type: number

> Default: 0.9

### distanceThreshold
The distance greater than which the bottomsheet would be snappable to the next snappoint, otherwise it would snap back to the old one.
> Type: number

> Default: 150

### closeOnOverlayClick
An option to keep the bottomsheet open or close it on overlay click.
> Type: boolean

> Default: true

## Lifecycle methods

### onInit
Operations to be run on initialisation of the bottomsheet can be done using this callback function.

> Type: function

eg:
```
BottomSheet({
      trigger: `target-1`,
      onInit: () => {
        console.log("init");
      }
  });
```


### onOpen
Operations to be run once the bottomsheet is open can be done using this callback function.

> Type: function

eg:
```
BottomSheet({
      trigger: `target-1`,
      onOpen: () => {
        console.log("open");
      }
    });
  });
```

### onClose
Operations to be run while closing the bottomsheet can be done using this callback function.

> Type: function

eg:
```
BottomSheet({
      trigger: `target-1`,
      onClose: () => {
        console.log("close");
      }
    });
```

## Methods

### open
Can be used to open the bottomsheet programatically. This works only if the sheet it already initialised.

eg:
```
let bottomsheet1 = BottomSheet({
      trigger: `target-1`
  });  //this would open the sheet by default
  
  bottomsheet1.open() //can be used if it's necessary to open the sheet in any other scenario.
```

### close
Can be used to close the bottomsheet programatically. This works only if the sheet it already initialised and open.

eg:
```
let bottomsheet1 = BottomSheet({
      trigger: `target-1`
  });
  
  bottomsheet1.close()
```

### destroy
Can be used to destroy the event listeners on the triggers when it's no longer needed.

eg:
```
let bottomsheet1 = BottomSheet({
      trigger: `target-1`
  });
  
  bottomsheet1.destroy()
```

## Styling
You can style the bottomsheet and other elements by overriding it's css styles. 

| Element         | ClassName                                                 |
|:----------------|:----------------------------------------------------------|
| Bottomsheet     | 'bottomsheet'                                             |
| Overlay         | 'overlay'                                                 |
| Modal           | 'modal'                                                   |
| Modal Close Icon| 'close-modal'                                             |
| Draggable Area  | 'draggable'                                               |





