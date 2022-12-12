import ko from './namespace';

ko.version = "process.env.BUILD_VERSION";

ko.exportSymbol('version', ko.version);
