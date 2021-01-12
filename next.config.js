module.exports = {
  async redirects() {
    return [
      // Official GeoCode Routing API SDK for Java.
      {
        source: "/java/sdk",
        destination: "https://github.com/stefanzone/geocode-sdk-for-java",
        permanent: true,
      }
    ];
  },
};
