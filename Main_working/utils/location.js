/**
 * Created by luffy on 2020/2/18.
 */
function formatLocation(longitude, latitude) {
    longitude = Number(longitude).toFixed(2),
        latitude = Number(latitude).toFixed(2)

    return {
        lng: longitude.toString().split('.'),
        lat: latitude.toString().split('.')
    }
}
module.exports = {
    format: formatLocation
};