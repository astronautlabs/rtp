import path from 'path';

export const src_include_dir = path.resolve(__dirname, '..', 'src');
export const build_include_dir = path.resolve(__dirname, '..', 'build', 'src');

export const build_dir = path.resolve(__dirname, '..', 'build');

export const debug_library_dir = path.resolve(__dirname, '..', 'build', 'src', 'Debug');
export const release_library_dir = path.resolve(__dirname, '..', 'build', 'src', 'Release');