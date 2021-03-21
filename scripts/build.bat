mkdir build
cd build
cmake -A x64 -DCMAKE_POSITION_INDEPENDENT_CODE=ON ..
cmake --build . --config Release
cmake --build . --config Debug

cp build\src\Debug\jrtplib_d.lib build\src\Debug\jrtplib.lib
cp build\src\jrtplib-static.dir\Debug\jrtplib-static.pdb build\src\Debug\jrtplib-static.pdb