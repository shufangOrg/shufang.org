{
  description = "shufang.org Hugo site build environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        hugo = pkgs.stdenv.mkDerivation rec {
          pname = "hugo";
          version = "0.87.0";
          src = pkgs.fetchurl {
            url = "https://github.com/gohugoio/hugo/releases/download/v${version}/hugo_extended_${version}_Linux-64bit.tar.gz";
            sha256 = "sha256-L4eaGCkm/Qd4Kp/bfMRVNdCYjPxKiEOkzsOmKSgD/s=";
          };
          sourceRoot = ".";
          installPhase = ''
            mkdir -p $out/bin
            cp hugo $out/bin/
          '';
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            hugo
            pkgs.ffmpeg
            pkgs.git
            pkgs.gnused
            pkgs.gawk
            pkgs.openssh
          ];
        };
      });
}
