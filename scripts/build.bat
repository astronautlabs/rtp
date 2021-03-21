mkdir build
cd build
cmake -A x64 -DCMAKE_POSITION_INDEPENDENT_CODE=ON ..
cmake --build . --config Release
cmake --build . --config Debug