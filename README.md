Content Cycle jQuery Plugin

Overview:
================================================================================

Content Cycle is a jQuery Plugin that allows content to be cycled with a fade-out fade-in transition like a slide show. An example can be found at http://www.coroprosvs.com.

If you find any errors or have suggested changes, please post a comment on the
github project: http://github.com/christophergrabowski/Content-Cycle-jQuery-Plugin

================================================================================


Adding cycling content to your html:
================================================================================

Formatting your html as cycling content is very easy. It looks like this:

```
<div id'cycling-container'>
    <div>
    ... some content
    </div>
    <div>
    ... some content
    </div>
    <div>
    ... some content
    </div>
</div>
```

As you will see below, the id of the container div can be anything. The content
that cycles can be anything -- images, paragraphs, whatever. Each 'slide' just
needs to be wrapped in its own div that is a direct child of the container div
with the id (cycling-container above).

You can also add a bullet-style navigation bar to manually flip through the
'slides'. Just put and empty div with the class 'content-cycle-bar' where
you want the bar to appear. For example:

```
<div id'cycling-container'>
    <div>
        <h2>Title</h2>
        <img src='some/image.png' />
        <div class='content-cycle-bar'></div>
        <p>Some interesting stuff.</p>
    </div>
    <div>
        <h2>Second Title</h2>
        <img src='some/other/image.png' />
        <div class='content-cycle-bar'></div>
        <p>More interesting stuff.</p>
    </div>
    <div>
        <h2>Third Title</h2>
        <img src='yet/another/image.png' />
        <div class='content-cycle-bar'></div>
        <p>Interesting stuff.</p>
    </div>
</div>
```

================================================================================


Adding the JavaScript:
================================================================================
Adding the JavaScript is also easy. It is only one line of code that needs to be
in a callback to the ready event of the document. Just call the contentCycle method
on the container div. Of course make sure you include the Content Cycle script
between the jQuery script and the script that calls the contentCycle method:

```
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/jquery.contentcycle.js"></script>

<script>
    $(document).ready(function(event) {
        $('#cycling-container').contentCycle();
    });
</script>
```

================================================================================


Options
================================================================================
The plugin's default options are as follows (All units are milliseconds):

```
{
    outSpeed : 1500, // The speed that the old 'slide' fades out
    inSpeed : 1500, // The speed that the new 'slide' fades in
    duration : 5000 // Amount of time a slide is displayed
}
```

================================================================================


Methods
================================================================================
The available methods are:

init: initializes and starts the cycling of content. Called by default with an
options object like this:

```
$('#cycling-container').contentCycle({
    outSpeed: 1000,
    inSpeed: 2000,
    duration: 10000
});
```

Or with no arguments to use the default options:

```
$('#cycling-container').contentCycle();
```

Other methods are called in the standard jQuery plugin fashion:

```
$('#cycling-container').contentCycle('method', 'arguments');
```

start: starts the cycling of content

stop: stops the cycling of content

back: flips back one 'slide'

forward: flips forward one 'slide'

change: changes to the 'slide' designated by an index argument (index starts at zero)

containHighestContentPage: makes the overall container div high enough to
contain the highest 'slide'. This is used internally. You shouldn't need to call
this manually, but it is available nonetheless.

================================================================================


Styling
================================================================================

Keep in mind that if the content in one 'slide' is considerably longer than others,
there will be an empty space present when the shorter 'slides' are displayed.
This is necessary to keep the content beneath the cycling content (e.g., the footer)
from jumping around every time a new slide is displayed.