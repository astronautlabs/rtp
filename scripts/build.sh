#!/bin/bash

mkdir build
cd build
cmake ..
cmake --release
cmake --debug