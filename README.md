# Js Bottomsheet

[![npm](https://badgen.net/npm/dt/js-bottomsheet)](https://www.npmjs.com/package/js-bottomsheet)

A pure Js snappable, scrollable, customisable bottomsheet!

## Features

- Works as a bottomsheet in mobile and as a modal or sidesheet in web.
- Supports multiple snap points.
- Uses spring animations.
- Supports stacking of bottomsheets.
- Is scrollable at the last snappoint.
- Supports dynamic content.
- Sidesheets are resizable.

## Dependencies:

1. Use Gesture: https://use-gesture.netlify.app/docs/#vanilla-javascript
2. Anime js: https://animejs.com/

## Installation

npm:

```
npm i js-bottomsheet
```

## Usage

Here's a simple usage of the bottomsheet with static content.

HTML:

```
  <button id="trigger-1" data-bottomsheet-id='bottomsheet-1'>click</button>
  <div id="bottomsheet-1" data-bottomsheet>The Bottomsheet</div>
```

The trigger should have an ID which would be used in the initialisation of the
bottomsheet, and a data attribute containing the ID referring to it's
corresponding bottomsheet `data-bottomsheet-id=[id]`. The bottomsheet should
have the ID as well as the data attribute `data-bottomsheet`

JS:

```
BottomSheet({
  trigger: 'trigger-1',
});
```

This would create a simple bottomsheet with the default props.

## Props:

properties that are common for all layouts - bottomsheet, modal and sidesheet

### trigger:

The Id of the trigger element.

> Type: string

### content:

Content needn't always be a DOM element, it could be passed in dynamically too,
as a string.

> Type: string

eg:

```
BottomSheet({
 trigger: 'trigger-1',
 content: `<div id="bottomsheet-1" data-bottomsheet>The Bottomsheet</div>`
});
```

### headerContent:

The content that needs to remain fixed at the top of the sheet. It should have a
class of 'header'.

> Type: string

eg:

```
BottomSheet({
 trigger: 'trigger-1',
 headerContent: `<div class="header">...</div>`
});
```

### footerContent:

The content that needs to remain fixed at the bottom of the sheet. It should
have a class of 'footer'.

> Type: string

eg:

```
BottomSheet({
 trigger: 'trigger-1',
 footerContent: `<div class="footer">...</div>`
});
```

### displayOverlay:

A boolean defining whether to display an overlay or not.

> Type: boolean

> Default: false

### webLayout:

This property determines the behavior of the sheet in web view, which can either
be a modal or a sidesheet. Sidesheets can be configured to open from either the
left or the right side of the screen.

> Type: 'modal || sideSheetLeft || sideSheetRight'

> Default: 'modal'

eg:

```
BottomSheet({
 trigger: 'trigger-1',
 content: <div id="bottomsheet-1" data-bottomsheet>The Bottomsheet</div>,
 webLayout: 'sideSheetLeft'
});
```

### openOnLoad:

This property enables the sheet to be automatically opened upon loading, without
requiring a trigger. Since there is no trigger, the content needs to be
dynamically passed in.

> Type: boolean

> Default: false

eg:

```
 BottomSheet({
  content: `<div id="maps-1" data-bottomsheet>The sheet</div>`,
  openOnLoad: true,
});
```

### cleanUpOnClose

This prop can be used to remove the sheet from the DOM on closing the sheet.

> Type: boolean

> Default: false

### dismissible

This property determines whether the sheet can be closed by the user or not. If
set to false, the sheet cannot be translated below it's minimum snap point.

> Type: boolean

> Default: true

### closeOnOverlayClick

A boolean to keep the sheet open or close it by clicking on the overlay.

> Type: boolean

> Default: true

### scrollableSheet

Defines whether the sheet is scrollable or not, when the sheet is at it's last
snap point.

> Type: booelean

> Default: true

## Bottomsheet specific props

### snapPoints:

An array of all the snappoints percentages you'd like the bottomsheet to snap
at, from bottom to top.

> Type: Array of strings

> Default: ['100%']

eg:

```
BottomSheet({
 trigger: 'trigger-1',
 snappoints: ['20%', '60%', '100%']
});
```

### draggableArea:

An area which would be sticky to the top of the sheet and would always listen to
drag events, even if the content of the sheet is scrollable. It should have an
ID.

> Type: string

eg:

```
BottomSheet({
 trigger: 'trigger-1',
 content: <div id="bottomsheet-1" data-bottomsheet>The Bottomsheet</div>,
 draggableArea: `<div id="drag"><svg  width="45" height="7" viewBox="0 0 45 7" fill="none" xmlns="http://www.w3.org/2000/svg">
 <rect width="45" height="7" rx="3.5" fill="#38383D"/></svg></div>`,
});
```

### rubberband

The rubberband effect is only applicable if the sheet is at it's last snap point
and is activated when scrollableSheet is set to false. It creates a snappy or
bouncy behavior for the bottom sheet.

> Type: booelean

> Default: false

### velocityThreshold

The velocity greater than which the bottomsheet would be translated to the next
snappoint, otherwise it would snap back to the old one.

> Type: number

> Default: 0.9

### distanceThreshold

The distance greater than which the bottomsheet would be translated to the next
snappoint, otherwise it would snap back to the old one.

> Type: number

> Default: 150

## Modal specific props

### modalPosition

It's an array of x and y positions in numbers as percentage for the modal.

> Type: Array of numbers

> Default: [50, 50]

### modalCloseIcon

Close icon for the modal in web.

> Type: string

> Default:

```
`<svg width="16" height="12" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M33.112 36.9133C34.3649 38.15 36.3963 38.15 37.6492 36.9133C38.9022 35.6766 38.9022 33.6716 37.6492 32.435L24.0375 19L37.6492 5.56496C38.9022 4.3283 38.9022 2.32328 37.6492 1.08662C36.3963 -0.150042 34.3649 -0.150042 33.112 1.08662L19.5002 14.5216L5.88835 1.08655C4.63541 -0.150108 2.60401 -0.150107 1.35108 1.08655C0.0981471 2.32321 0.0981459 4.32824 1.35108 5.5649L14.9629 19L1.35108 32.435C0.0981434 33.6717 0.0981443 35.6767 1.35108 36.9134C2.60401 38.15 4.63541 38.15 5.88834 36.9134L19.5002 23.4783L33.112 36.9133Z" fill="white"/>
 </svg>`
```

### minWidthForModal:

The minimum width at which you'd like a modal to appear.

> Type: number

> Default: 700

## Sidesheet specific props:

### sideSheetMinValue

The minimum snap point percentage at which the sidesheet would open, resizing
below it would close the sheet.

> Type: number - 0 to 100

### sideSheetMaxValue

The maximum snap point percentage upto which the sidesheet can be resized.

> Type: number - 0 to 100

## Lifecycle methods

### onInit

This callback function can be used to perform operations during the
initialization of the bottom sheet.

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

This callback function can be used to perform operations once the sheet is open.

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

This callback function can be used to perform operations once the sheet is
closed.

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

### onDragStart

This callback function allows you to perform operations when starting to drag
the sheet.

> Type: function

eg:

```
BottomSheet({
      trigger: `target-1`,
      onDragStart: () => {
        console.log("drag start");
      }
    });
```

### onDragEnd

Operations to be run when dragging of the sheet ends can be done using this
callback function.

> Type: function

eg:

```
BottomSheet({
      trigger: `target-1`,
      onDragEnd: () => {
        console.log("drag end");
      }
    });
```

## Methods

### open

Can be used to open the bottomsheet programatically. This works only if the
sheet it already initialised.

eg:

```
let bottomsheet1 = BottomSheet({
      trigger: `target-1`
  });  //this would open the sheet by default

  bottomsheet1.open() //can be used if it's necessary to open the sheet in any other scenario.
```

### close

Can be used to close the bottomsheet programatically. This works only if the
sheet it already initialised and open.

eg:

```
let bottomsheet1 = BottomSheet({
      trigger: `target-1`
  });

  bottomsheet1.close()
```

### destroy

"When no longer needed, the event listeners can be removed from the triggers
using this method."

eg:

```
let bottomsheet1 = BottomSheet({
      trigger: `target-1`
  });

  bottomsheet1.destroy()
```

### init

The sheet can be re-initialised if needed, using this function.

eg:

```
let bottomsheet1 = BottomSheet({
      trigger: `target-1`
  });

  bottomsheet1.init()
```

## Styling

You can style the bottomsheet and other elements by overriding it's css styles.

| Element          | ClassName     |
| :--------------- | :------------ |
| Bottomsheet      | 'bottomsheet' |
| Overlay          | 'overlay'     |
| Modal            | 'modal'       |
| Modal Close Icon | 'close-modal' |
| Draggable Area   | 'draggable'   |
