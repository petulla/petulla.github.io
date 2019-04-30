# How to build files

- run `node __helpers/cropImages.js` to copy files from `__helpers/data` to the petulla.github.io repo and into the `img` folder.

- run `node build.js` to build the site and copy files from `build` to the petulla.github.io repo.

# How to build images
- add 1200x200px png images to `__helpers/data`. Ensure the file name matches the project slug. Run the build task.

# How to mergge
- [Follow](https://stackoverflow.com/a/16455853/2573069) to ignore the `dev` folder at root.
