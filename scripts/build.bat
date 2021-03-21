mkdir build
cd build
cmake -A x64 -DCMAKE_POSITION_INDEPENDENT_CODE=ON ..
cmake --build . --config Release
cmake --build . --config Debug


cp src\Debug\jrtplib_d.lib src\Debug\jrtplib.lib
cp src\jrtplib-static.dir\Debug\jrtplib-static.pdb src\Debug\jrtplib-static.pdb