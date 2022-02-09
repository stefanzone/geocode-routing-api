module.exports = {
  async redirects() {
    return [
      // GeoCode Routing API (Open Source)
      {
        source: "/github",
        destination: "https://github.com/stefanzone/geocode-routing-api",
        permanent: true,
      },
      // Official GeoCode Routing API SDK for Java.
      {
        source: "/java/sdk",
        destination: "https://github.com/stefanzone/geocode-sdk-for-java",
        permanent: true,
      }
    ];
  },
};
