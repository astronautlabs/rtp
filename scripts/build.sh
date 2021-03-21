#!/bin/bash

set -x

mkdir -p build
cd build
cmake -DCMAKE_POSITION_INDEPENDENT_CODE=ON ..
cmake --build . --config Release
cmake --build . --config Debug