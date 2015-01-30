# Joylight

This is the code repository for the "Joylight" project, an LED light installation created by the Sullivan family.  For more information about the project itself, see [my Joylight post](TODO).

## Getting Started

To run this code, you'll need [Node.js](http://nodejs.org/) installed.

Install dependencies:

    $ npm install

With Fadecandy server running, start the `main.js` file:

    $ cd src/
    $ node main

## Running the OPC simulator

To run the simulator, first download and build OpenPixelControl:

    $ git clone https://github.com/zestyping/openpixelcontrol.git
    $ cd openpixelcontrol/
    $ make

Then from the `joylight/` directory, run the simulator pointing to the star layout:

    $ ./openpixelcontrol/bin/gl_server ./assets/star_layout.json

Now when running the `main` script, pass the `SIMULATOR` environment variable because the light layout is slightly different in the simulator:

    $ cd src/
    $ SIMULATOR=1 node main

And that's all!  Hurray!
