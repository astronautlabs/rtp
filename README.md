# @/rtp

> **[📜 IETF RFC 3550](https://tools.ietf.org/html/rfc3550)**  
> RTP: A Transport Protocol for Real-Time Applications

> 📘 **Attribution**  
> Based on [JRTPLIB](https://github.com/j0r1/JRTPLIB) by Jori Liesenborgs,
> originally developed at the Expertise Centre for Digital Media (EDM), a research 
> institute of the Hasselt University

> 📺 Part of the **Astronaut Labs Broadcast Suite**  
> [@/rfc8331](https://github.com/astronautlabs/rfc8331) |
> [@/rtp](https://github.com/astronautlabs/rtp) |
> [@/scte104](https://github.com/astronautlabs/scte104) | 
> [@/scte35](https://github.com/astronautlabs/scte35) | 
> [@/st2010](https://github.com/astronautlabs/st2010) | 
> [@/st291](https://github.com/astronautlabs/st291)

> ✅ **Release Quality**  
> This package is ready for production

---

An RTP implementation in C++ based on JRTPLib. Native bindings for Node.js coming soon.

## Installing 

You must have `cmake` available to build this package (even at runtime):

```bash
choco install cmake  # windows
apt install cmake    # linux
brew install cmake   # mac
```

Then, add a dependency to it:

```
npm install @astronautlabs/rtp
```

## Contributing 

We welcome contributions, feel free to raise issues or file pull requests. Make sure to review and abide by the [Code of Conduct](CODE_OF_CONDUCT.md).

## Development 

### C++ Defines

- `RTP_HAVE_SYS_FILIO`:  Set if `<sys/filio.h>` exists.
- `RTP_HAVE_SYS_SOCKIO`: Set if `<sys/sockio.h>` exists.
- `RTP_BIG_ENDIAN`: If set, assume big-endian byte ordering.
- `RTP_SOCKLENTYPE_UINT`: Indicates that getsockname used an unsigned int 
  as its third parameter.
- `RTP_HAVE_SOCKADDR_LEN`: Indicates that struct sockaddr has an sa_len 
  field.
- `RTP_SUPPORT_IPV4MULTICAST`: Enables support for IPv4 multicasting.
- `RTP_SUPPORT_THREAD`: Enables support for JThread.
- `RTP_SUPPORT_SDESPRIV`: Enables support for RTCP SDES private items.
- `RTP_SUPPORT_PROBATION`: If set, a few consecutive RTP packets are 
  needed to validate a member.
- `RTP_SUPPORT_GETLOGINR`: If set, the library will use getlogin_r instead
  of getlogin.
- `RTP_SUPPORT_IPV6`: If set, IPv6 support is enabled.
- `RTP_SUPPORT_IPV6MULTICAST`: If set, IPv6 multicasting support is enabled.
- `RTP_SUPPORT_SENDAPP`: If set, sending of RTCP app packets is enabled.
- `RTP_SUPPORT_MEMORYMANAGEMENT`: If set, the memory management system is 
  enabled.
- `RTP_SUPPORT_RTCPUNKNOWN`: If set, sending of unknown RTCP packets is 
  enabled.
- `RTPDEBUG`: Enables some memory tracking functions and some debug 
  routines.
    
### Cross-compilation of JThread & JRTPLIB for Android

**Warning:** When cross-compiling, the configuration defaults to big-endian.
But since most Android systems are little-endian, you should probably change
this setting in the CMake configuration.

The approach I follow for cross-compiling these libraries for the Android
platform is sketched below. The following lines are stored in a file called 
`toolchain.cmake` (for example):

    set(CMAKE_SYSTEM_NAME Android)
    set(CMAKE_SYSTEM_VERSION 21) # API level
    set(CMAKE_ANDROID_ARCH_ABI armeabi-v7a)
    set(CMAKE_ANDROID_NDK /path/to/ndk-bundle/)
    set(CMAKE_ANDROID_STL_TYPE gnustl_static)
    
    set(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
    set(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
    set(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)
    set(CMAKE_FIND_ROOT_PATH_MODE_PACKAGE ONLY)
    
When starting CMake, first for JThread and afterwards for JRTPLIB, I then manually 
add the following entries:

    CMAKE_TOOLCHAIN_FILE /path/to/toolchain.cmake
    CMAKE_INSTALL_PREFIX /path/to/installation/directory
    CMAKE_FIND_ROOT_PATH /path/to/installation/directory

For example, I like to use the `ccmake` program, which would yield
the following command line:

    ccmake -DCMAKE_TOOLCHAIN_FILE=/path/to/toolchain.cmake \
           -DCMAKE_INSTALL_PREFIX=/path/to/installation/directory \
           -DCMAKE_FIND_ROOT_PATH=/path/to/installation/directory \
           /path/to/main/CMakeLists.txt

After configuring JThread this way, just build and install it. The same CMake
procedure for JRTPLIB should then automatically detect the correct JThread
(so the one that's installed in your cross-compilation installation directory),
after which you can again build and install the RTP library.
