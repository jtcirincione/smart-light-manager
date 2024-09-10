import asyncio
from kasa import Discover, Device
from flask import current_app

async def setup():
    dev = await Discover.discover_single("192.168.1.95", port=9999)
    return dev

async def get_device():
    with current_app.app_context():
        device = current_app.config.get('KASA_DEVICE')
        if device is None:
            try:
                device = await Discover.discover_single("192.168.1.95", port=9999)
                current_app.config['KASA_DEVICE'] = device
            except:
                raise RuntimeError("Device is not available. Make sure it's initialized properly.")
    return device

async def on():
    try:
        device = await asyncio.wait_for(get_device(), timeout=3)
    except:
        return
    await asyncio.wait_for(device.turn_on(), timeout=3)

async def off():
    try:
        device = await asyncio.wait_for(get_device(), timeout=3)
    except:
        return
    await asyncio.wait_for(device.turn_off(), timeout=3)