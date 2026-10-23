#!/usr/bin/env python3
"""
scripts/apply_new_pi_modal.py
Converts New PI to open in a Base Design System Modal Popup (Option 1),
with the complete 4-column responsive form matching Image 2, and exposes
SalesView to window across all target files.
"""

import os, re

NEW_PI_SECTION_CODE = '''  // ==========================================
  // INTERNAL SCREEN: NEW PROFORMA INVOICE (IMAGE 2)
  // ==========================================
  openNewPi() {
    this.openNewPiModal();
  },

  openNewPiModal() {
    if (typeof Modal === 'undefined' || !Modal.open) {
      alert('Modal dialog component not ready.');
      return;
    }

    Modal.open({
      title: 'New Proforma Invoice',
      size: 'xl',
      content: `
        <form id="form-new-proforma" onsubmit="event.preventDefault(); SalesView.submitNewPi();">
          <div class="space-y-4 text-xs text-[#0F172A]">
            <!-- ROW 1 (4 cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  SELECT EXPORTER <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-exporter" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Exporter</option>
                  <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                  <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  SELECT PROCESSOR <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-processor" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Processor</option>
                  <option value="857">857 - USHA Processing Unit</option>
                  <option value="853" selected>853 - VSP Processing Unit</option>
                  <option value="1888">1888 - JPT Processing Unit</option>
                  <option value="24234236">24234236 - SATYA Processing Unit</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  NO OF CONTAINERS
                </label>
                <div class="flex items-center h-9 border border-[#E2E8F0] rounded-lg overflow-hidden bg-white">
                  <button type="button" class="w-9 h-full flex items-center justify-center text-[#475569] hover:bg-[#F1F5F9] font-bold cursor-pointer transition-colors" onclick="SalesView.adjustContainerCount(-1)">-</button>
                  <input type="number" id="new-pi-containers" value="1" min="1" max="99" class="flex-1 text-center font-bold text-xs text-[#0F172A] outline-none border-x border-[#E2E8F0] h-full" />
                  <button type="button" class="w-9 h-full flex items-center justify-center text-[#475569] hover:bg-[#F1F5F9] font-bold cursor-pointer transition-colors" onclick="SalesView.adjustContainerCount(1)">+</button>
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  REFERENCE NUMBER
                </label>
                <input type="text" id="new-pi-ref-no" placeholder="Enter Reference Number" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>
            </div>

            <!-- ROW 2 (4 cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  PROFORMA INVOICE NO <span class="text-[#FF5150]">*</span>
                </label>
                <input type="text" id="new-pi-number" value="DFL/PI/1316/26-27" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  PROFORMA INVOICE DATE <span class="text-[#FF5150]">*</span>
                </label>
                <input type="date" id="new-pi-date" value="2026-10-21" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  P.O NO
                </label>
                <input type="text" id="new-pi-po-no" placeholder="Enter P.O Number" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  P.O DATE
                </label>
                <input type="date" id="new-pi-po-date" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>
            </div>

            <!-- ROW 3 (4 cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  CONSIGNEE <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-consignee" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Consignee</option>
                  <option value="EASTERN FISH COMPANY LLC" selected>EASTERN FISH COMPANY LLC</option>
                  <option value="PACIFIC SEAFOOD GROUP,">PACIFIC SEAFOOD GROUP,</option>
                  <option value="ARISTA INDUSTRIES INC">ARISTA INDUSTRIES INC</option>
                  <option value="RED CHAMBER CO.">RED CHAMBER CO.</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  ULTIMATE CONSIGNEE
                </label>
                <select id="new-pi-ultimate-consignee" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" selected>Select Ultimate Consignee</option>
                  <option value="SAME AS CONSIGNEE">SAME AS CONSIGNEE</option>
                  <option value="EASTERN FISH COMPANY LLC">EASTERN FISH COMPANY LLC</option>
                  <option value="PACIFIC SEAFOOD GROUP,">PACIFIC SEAFOOD GROUP,</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  BUYER NAME
                </label>
                <select id="new-pi-buyer" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" selected>Select Buyer</option>
                  <option value="EASTERN FISH COMPANY LLC" selected>EASTERN FISH COMPANY LLC</option>
                  <option value="PACIFIC SEAFOOD GROUP,">PACIFIC SEAFOOD GROUP,</option>
                  <option value="ARISTA INDUSTRIES INC">ARISTA INDUSTRIES INC</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  NOTIFY PARTY
                </label>
                <select id="new-pi-notify" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" selected>Select Notify Party</option>
                  <option value="SAME AS CONSIGNEE">SAME AS CONSIGNEE</option>
                  <option value="EASTERN FISH COMPANY LLC">EASTERN FISH COMPANY LLC</option>
                  <option value="EXPEDITORS INTL OF WASHINGTON">EXPEDITORS INTL OF WASHINGTON</option>
                </select>
              </div>
            </div>

            <!-- ROW 4 (4 cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  IMPORTER OF RECORD <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-importer" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Importer of Record</option>
                  <option value="EASTERN FISH COMPANY LLC" selected>EASTERN FISH COMPANY LLC</option>
                  <option value="PACIFIC SEAFOOD GROUP">PACIFIC SEAFOOD GROUP</option>
                  <option value="ARISTA INDUSTRIES INC">ARISTA INDUSTRIES INC</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  AGENT
                </label>
                <select id="new-pi-agent" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" selected>Select Agent</option>
                  <option value="COASTAL MARINE AGENCIES">COASTAL MARINE AGENCIES</option>
                  <option value="SAGAR MARINE BROKERS">SAGAR MARINE BROKERS</option>
                  <option value="DELTA SEAFOOD ASSOCIATES">DELTA SEAFOOD ASSOCIATES</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  CERTIFICATION
                </label>
                <select id="new-pi-cert" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" selected>Select Certification</option>
                  <option value="BAP 4-Star">BAP 4-Star</option>
                  <option value="BRCGS">BRCGS Grade A</option>
                  <option value="ASC">ASC Certified</option>
                  <option value="HACCP">HACCP Compliance</option>
                  <option value="FSSC 22000">FSSC 22000</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  PORT OF LOADING <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-pol" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Port of Loading</option>
                  <option value="Visakhapatnam (INVTZ)" selected>Visakhapatnam (INVTZ)</option>
                  <option value="Chennai (INMAA)">Chennai (INMAA)</option>
                  <option value="Kolkata (INCCU)">Kolkata (INCCU)</option>
                  <option value="Krishnapatnam (INKRI)">Krishnapatnam (INKRI)</option>
                </select>
              </div>
            </div>

            <!-- ROW 5 (4 cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  DESTINATION COUNTRY <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-dest-country" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Country</option>
                  <option value="USA" selected>USA</option>
                  <option value="CHINA">CHINA</option>
                  <option value="BELGIUM">BELGIUM</option>
                  <option value="RUSSIA">RUSSIA</option>
                  <option value="JAPAN">JAPAN</option>
                  <option value="CANADA">CANADA</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  PORT OF DISCHARGE <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-pod" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Port of Discharge</option>
                  <option value="Los Angeles, USA" selected>Los Angeles, USA</option>
                  <option value="New York, USA">New York, USA</option>
                  <option value="Seattle, USA">Seattle, USA</option>
                  <option value="Rotterdam, Netherlands">Rotterdam, Netherlands</option>
                  <option value="Shanghai, China">Shanghai, China</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  FINAL DESTINATION COUNTRY
                </label>
                <select id="new-pi-final-dest-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" selected>Select Final Destination Country</option>
                  <option value="USA" selected>USA</option>
                  <option value="CHINA">CHINA</option>
                  <option value="BELGIUM">BELGIUM</option>
                  <option value="RUSSIA">RUSSIA</option>
                  <option value="JAPAN">JAPAN</option>
                  <option value="CANADA">CANADA</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  FINAL DESTINATION <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-final-dest" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Final Destination</option>
                  <option value="Los Angeles, CA" selected>Los Angeles, CA</option>
                  <option value="Elizabeth, NJ">Elizabeth, NJ</option>
                  <option value="Seattle, WA">Seattle, WA</option>
                  <option value="Rotterdam Port">Rotterdam Port</option>
                </select>
              </div>
            </div>

            <!-- ROW 6 (4 cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  SHIPBY DATE
                </label>
                <input type="date" id="new-pi-shipby" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  SHIPBY DATE 2 (TEXT)
                </label>
                <input type="text" id="new-pi-shipby-text" placeholder="Enter ShipBy Date Text (e.g. Prompt)" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  BANK DETAILS <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-bank" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Bank</option>
                  <option value="HDFC BANK - VSP" selected>HDFC BANK - VSP (A/C #992019283)</option>
                  <option value="STATE BANK OF INDIA - OVERSEAS">STATE BANK OF INDIA - OVERSEAS (A/C #001928392)</option>
                  <option value="ICICI BANK LIMITED - EXPORT">ICICI BANK LIMITED - EXPORT (A/C #448291039)</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  SHOW BANK <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-show-bank" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="Yes">Yes</option>
                  <option value="No" selected>No</option>
                </select>
              </div>
            </div>

            <!-- ROW 7 (4 cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  PAYMENT TERMS <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-payment-terms" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Payment</option>
                  <option value="CAD (Cash Against Documents)" selected>CAD (Cash Against Documents)</option>
                  <option value="100% LC at Sight">100% LC at Sight</option>
                  <option value="30% Advance + 70% TT">30% Advance + 70% TT</option>
                  <option value="DA 60 Days">DA 60 Days</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  SHIPMENT TERMS <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-shipment-terms" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Shipment Terms</option>
                  <option value="CIF" selected>CIF (Cost, Insurance & Freight)</option>
                  <option value="FOB">FOB (Free on Board)</option>
                  <option value="CFR">CFR (Cost & Freight)</option>
                  <option value="DDP">DDP (Delivered Duty Paid)</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  DELIVERY TERMS <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-delivery-terms" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select</option>
                  <option value="PORT_TO_PORT" selected>PORT TO PORT</option>
                  <option value="DOOR_TO_DOOR">DOOR TO DOOR</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  QUANTITY UNITS <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-qty-units" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Quantity Units</option>
                  <option value="LBS" selected>LBS (Pounds)</option>
                  <option value="KGS">KGS (Kilograms)</option>
                  <option value="CARTONS">CARTONS</option>
                </select>
              </div>
            </div>

            <!-- ROW 8 (4 cols) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  CURRENCY <span class="text-[#FF5150]">*</span>
                </label>
                <select id="new-pi-currency" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                  <option value="" disabled selected>Select Currency</option>
                  <option value="USD" selected>USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  FREIGHT
                </label>
                <input type="text" id="new-pi-freight" placeholder="Enter Freight" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  CHARGE NAME
                </label>
                <input type="text" id="new-pi-charge-name" placeholder="Enter Charge Name" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>

              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  CHARGE AMOUNT
                </label>
                <input type="text" id="new-pi-charge-amount" placeholder="Enter Charge Amount" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>
            </div>

            <!-- ROW 9: PRODUCTION PLANT -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  PRODUCTION PLANT
                </label>
                <input type="text" id="new-pi-plant" placeholder="e.g. USHA, VSP, JPT, SATYA" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
              </div>
            </div>

            <!-- ROW 10: REMARKS -->
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                REMARKS
              </label>
              <textarea id="new-pi-remarks" rows="2" placeholder="Enter Remarks" class="w-full p-2.5 rounded-lg border border-[#E2E8F0] bg-white text-xs text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all"></textarea>
            </div>
          </div>
        </form>
      `,
      footerButtons: [
        {
          label: 'Cancel',
          type: 'secondary',
          onClick: (m) => m.close()
        },
        {
          label: 'Create Proforma Invoice',
          type: 'primary',
          onClick: () => SalesView.submitNewPi()
        }
      ]
    });
  },

  renderNewPi(container) {
    container.innerHTML = `
      <div class="space-y-4 animate-fade-in text-[#0F172A]">
        <!-- Breadcrumbs Navigation -->
        <div class="flex items-center gap-2 text-xs text-[#64748B] mb-1 select-none">
          <span class="hover:text-[#0F172A]">Orders</span>
          <span class="text-[#94A3B8]">/</span>
          <a href="#/sales/orders/proforma-list" class="text-[#006C7A] hover:underline font-semibold">Proforma List</a>
          <span class="text-[#94A3B8]">/</span>
          <span class="text-[#0F172A] font-bold">New Proforma Invoice</span>
        </div>

        <!-- Section Title Header -->
        <div class="flex items-center justify-between pb-1">
          <h1 class="text-xl font-extrabold text-[#0F172A] tracking-tight">New Proforma Invoice</h1>
          <button type="button" class="px-4 py-2 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#475569] hover:text-[#0F172A] cursor-pointer transition-colors flex items-center gap-1.5" onclick="window.location.hash=\'#/sales/orders/proforma-list\'">
            <svg class="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            <span>Back to Proforma List</span>
          </button>
        </div>

        <!-- Form Card Container (Base Design System with AquaPulse Colors) -->
        <div class="bg-white rounded-xl border border-[#DFE1E6] p-6 shadow-xs">
          <form id="form-new-proforma" onsubmit="event.preventDefault(); SalesView.submitNewPi();">
            <div class="space-y-4 text-xs text-[#0F172A]">
              <!-- ROW 1 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SELECT EXPORTER <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-exporter" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Exporter</option>
                    <option value="DEVI FISHERIES LIMITED" selected>DEVI FISHERIES LIMITED</option>
                    <option value="DEVI AQUA FEEDS">DEVI AQUA FEEDS</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SELECT PROCESSOR <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-processor" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Processor</option>
                    <option value="857">857 - USHA Processing Unit</option>
                    <option value="853" selected>853 - VSP Processing Unit</option>
                    <option value="1888">1888 - JPT Processing Unit</option>
                    <option value="24234236">24234236 - SATYA Processing Unit</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    NO OF CONTAINERS
                  </label>
                  <div class="flex items-center h-9 border border-[#E2E8F0] rounded-lg overflow-hidden bg-white">
                    <button type="button" class="w-9 h-full flex items-center justify-center text-[#475569] hover:bg-[#F1F5F9] font-bold cursor-pointer transition-colors" onclick="SalesView.adjustContainerCount(-1)">-</button>
                    <input type="number" id="new-pi-containers" value="1" min="1" max="99" class="flex-1 text-center font-bold text-xs text-[#0F172A] outline-none border-x border-[#E2E8F0] h-full" />
                    <button type="button" class="w-9 h-full flex items-center justify-center text-[#475569] hover:bg-[#F1F5F9] font-bold cursor-pointer transition-colors" onclick="SalesView.adjustContainerCount(1)">+</button>
                  </div>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    REFERENCE NUMBER
                  </label>
                  <input type="text" id="new-pi-ref-no" placeholder="Enter Reference Number" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>
              </div>

              <!-- ROW 2 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    PROFORMA INVOICE NO <span class="text-[#FF5150]">*</span>
                  </label>
                  <input type="text" id="new-pi-number" value="DFL/PI/1316/26-27" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    PROFORMA INVOICE DATE <span class="text-[#FF5150]">*</span>
                  </label>
                  <input type="date" id="new-pi-date" value="2026-10-21" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    P.O NO
                  </label>
                  <input type="text" id="new-pi-po-no" placeholder="Enter P.O Number" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    P.O DATE
                  </label>
                  <input type="date" id="new-pi-po-date" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>
              </div>

              <!-- ROW 3 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    CONSIGNEE <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-consignee" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Consignee</option>
                    <option value="EASTERN FISH COMPANY LLC" selected>EASTERN FISH COMPANY LLC</option>
                    <option value="PACIFIC SEAFOOD GROUP,">PACIFIC SEAFOOD GROUP,</option>
                    <option value="ARISTA INDUSTRIES INC">ARISTA INDUSTRIES INC</option>
                    <option value="RED CHAMBER CO.">RED CHAMBER CO.</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    ULTIMATE CONSIGNEE
                  </label>
                  <select id="new-pi-ultimate-consignee" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Ultimate Consignee</option>
                    <option value="SAME AS CONSIGNEE">SAME AS CONSIGNEE</option>
                    <option value="EASTERN FISH COMPANY LLC">EASTERN FISH COMPANY LLC</option>
                    <option value="PACIFIC SEAFOOD GROUP,">PACIFIC SEAFOOD GROUP,</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    BUYER NAME
                  </label>
                  <select id="new-pi-buyer" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Buyer</option>
                    <option value="EASTERN FISH COMPANY LLC" selected>EASTERN FISH COMPANY LLC</option>
                    <option value="PACIFIC SEAFOOD GROUP,">PACIFIC SEAFOOD GROUP,</option>
                    <option value="ARISTA INDUSTRIES INC">ARISTA INDUSTRIES INC</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    NOTIFY PARTY
                  </label>
                  <select id="new-pi-notify" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Notify Party</option>
                    <option value="SAME AS CONSIGNEE">SAME AS CONSIGNEE</option>
                    <option value="EASTERN FISH COMPANY LLC">EASTERN FISH COMPANY LLC</option>
                    <option value="EXPEDITORS INTL OF WASHINGTON">EXPEDITORS INTL OF WASHINGTON</option>
                  </select>
                </div>
              </div>

              <!-- ROW 4 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    IMPORTER OF RECORD <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-importer" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Importer of Record</option>
                    <option value="EASTERN FISH COMPANY LLC" selected>EASTERN FISH COMPANY LLC</option>
                    <option value="PACIFIC SEAFOOD GROUP">PACIFIC SEAFOOD GROUP</option>
                    <option value="ARISTA INDUSTRIES INC">ARISTA INDUSTRIES INC</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    AGENT
                  </label>
                  <select id="new-pi-agent" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Agent</option>
                    <option value="COASTAL MARINE AGENCIES">COASTAL MARINE AGENCIES</option>
                    <option value="SAGAR MARINE BROKERS">SAGAR MARINE BROKERS</option>
                    <option value="DELTA SEAFOOD ASSOCIATES">DELTA SEAFOOD ASSOCIATES</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    CERTIFICATION
                  </label>
                  <select id="new-pi-cert" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Certification</option>
                    <option value="BAP 4-Star">BAP 4-Star</option>
                    <option value="BRCGS">BRCGS Grade A</option>
                    <option value="ASC">ASC Certified</option>
                    <option value="HACCP">HACCP Compliance</option>
                    <option value="FSSC 22000">FSSC 22000</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    PORT OF LOADING <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-pol" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Port of Loading</option>
                    <option value="Visakhapatnam (INVTZ)" selected>Visakhapatnam (INVTZ)</option>
                    <option value="Chennai (INMAA)">Chennai (INMAA)</option>
                    <option value="Kolkata (INCCU)">Kolkata (INCCU)</option>
                    <option value="Krishnapatnam (INKRI)">Krishnapatnam (INKRI)</option>
                  </select>
                </div>
              </div>

              <!-- ROW 5 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    DESTINATION COUNTRY <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-dest-country" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Country</option>
                    <option value="USA" selected>USA</option>
                    <option value="CHINA">CHINA</option>
                    <option value="BELGIUM">BELGIUM</option>
                    <option value="RUSSIA">RUSSIA</option>
                    <option value="JAPAN">JAPAN</option>
                    <option value="CANADA">CANADA</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    PORT OF DISCHARGE <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-pod" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Port of Discharge</option>
                    <option value="Los Angeles, USA" selected>Los Angeles, USA</option>
                    <option value="New York, USA">New York, USA</option>
                    <option value="Seattle, USA">Seattle, USA</option>
                    <option value="Rotterdam, Netherlands">Rotterdam, Netherlands</option>
                    <option value="Shanghai, China">Shanghai, China</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    FINAL DESTINATION COUNTRY
                  </label>
                  <select id="new-pi-final-dest-country" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" selected>Select Final Destination Country</option>
                    <option value="USA" selected>USA</option>
                    <option value="CHINA">CHINA</option>
                    <option value="BELGIUM">BELGIUM</option>
                    <option value="RUSSIA">RUSSIA</option>
                    <option value="JAPAN">JAPAN</option>
                    <option value="CANADA">CANADA</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    FINAL DESTINATION <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-final-dest" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Final Destination</option>
                    <option value="Los Angeles, CA" selected>Los Angeles, CA</option>
                    <option value="Elizabeth, NJ">Elizabeth, NJ</option>
                    <option value="Seattle, WA">Seattle, WA</option>
                    <option value="Rotterdam Port">Rotterdam Port</option>
                  </select>
                </div>
              </div>

              <!-- ROW 6 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SHIPBY DATE
                  </label>
                  <input type="date" id="new-pi-shipby" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SHIPBY DATE 2 (TEXT)
                  </label>
                  <input type="text" id="new-pi-shipby-text" placeholder="Enter ShipBy Date Text (e.g. Prompt)" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    BANK DETAILS <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-bank" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Bank</option>
                    <option value="HDFC BANK - VSP" selected>HDFC BANK - VSP (A/C #992019283)</option>
                    <option value="STATE BANK OF INDIA - OVERSEAS">STATE BANK OF INDIA - OVERSEAS (A/C #001928392)</option>
                    <option value="ICICI BANK LIMITED - EXPORT">ICICI BANK LIMITED - EXPORT (A/C #448291039)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SHOW BANK <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-show-bank" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="Yes">Yes</option>
                    <option value="No" selected>No</option>
                  </select>
                </div>
              </div>

              <!-- ROW 7 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    PAYMENT TERMS <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-payment-terms" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Payment</option>
                    <option value="CAD (Cash Against Documents)" selected>CAD (Cash Against Documents)</option>
                    <option value="100% LC at Sight">100% LC at Sight</option>
                    <option value="30% Advance + 70% TT">30% Advance + 70% TT</option>
                    <option value="DA 60 Days">DA 60 Days</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    SHIPMENT TERMS <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-shipment-terms" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Shipment Terms</option>
                    <option value="CIF" selected>CIF (Cost, Insurance & Freight)</option>
                    <option value="FOB">FOB (Free on Board)</option>
                    <option value="CFR">CFR (Cost & Freight)</option>
                    <option value="DDP">DDP (Delivered Duty Paid)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    DELIVERY TERMS <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-delivery-terms" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select</option>
                    <option value="PORT_TO_PORT" selected>PORT TO PORT</option>
                    <option value="DOOR_TO_DOOR">DOOR TO DOOR</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    QUANTITY UNITS <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-qty-units" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Quantity Units</option>
                    <option value="LBS" selected>LBS (Pounds)</option>
                    <option value="KGS">KGS (Kilograms)</option>
                    <option value="CARTONS">CARTONS</option>
                  </select>
                </div>
              </div>

              <!-- ROW 8 (4 cols) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    CURRENCY <span class="text-[#FF5150]">*</span>
                  </label>
                  <select id="new-pi-currency" required class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                    <option value="" disabled selected>Select Currency</option>
                    <option value="USD" selected>USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    FREIGHT
                  </label>
                  <input type="text" id="new-pi-freight" placeholder="Enter Freight" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    CHARGE NAME
                  </label>
                  <input type="text" id="new-pi-charge-name" placeholder="Enter Charge Name" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    CHARGE AMOUNT
                  </label>
                  <input type="text" id="new-pi-charge-amount" placeholder="Enter Charge Amount" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>
              </div>

              <!-- ROW 9: PRODUCTION PLANT -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    PRODUCTION PLANT
                  </label>
                  <input type="text" id="new-pi-plant" placeholder="e.g. USHA, VSP, JPT, SATYA" class="w-full h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all">
                </div>
              </div>

              <!-- ROW 10: REMARKS -->
              <div>
                <label class="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                  REMARKS
                </label>
                <textarea id="new-pi-remarks" rows="3" placeholder="Enter Remarks" class="w-full p-3 rounded-lg border border-[#E2E8F0] bg-white text-xs text-[#0F172A] outline-none focus:border-[#006C7A] focus:ring-1 focus:ring-[#006C7A] transition-all"></textarea>
              </div>

              <!-- BOTTOM ACTION BAR -->
              <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
                <button type="button" class="px-5 py-2.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#475569] hover:text-[#0F172A] cursor-pointer transition-colors" onclick="window.location.hash=\'#/sales/orders/proforma-list\'">
                  Cancel
                </button>
                <button type="submit" class="px-6 py-2.5 rounded-lg bg-[#006C7A] hover:bg-[#005662] text-white text-xs font-bold shadow-xs hover:shadow cursor-pointer transition-all flex items-center gap-2">
                  <span>Create Proforma Invoice</span>
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;
  },

  adjustContainerCount(delta) {
    const el = document.getElementById('new-pi-containers');
    if (!el) return;
    let val = parseInt(el.value, 10) || 1;
    val = Math.max(1, Math.min(99, val + delta));
    el.value = val;
  },

  submitNewPi() {
    const piNumber = document.getElementById('new-pi-number')?.value.trim() || `DFL/PI/${Math.floor(1316 + Math.random() * 50)}/26-27`;
    const piDate = document.getElementById('new-pi-date')?.value || '21/10/2026';
    const poNo = document.getElementById('new-pi-po-no')?.value.trim() || 'PO-2026-NEW';
    const buyer = document.getElementById('new-pi-consignee')?.value || 'EASTERN FISH COMPANY LLC';
    const processor = document.getElementById('new-pi-processor')?.value || '853';
    const productionPlant = document.getElementById('new-pi-plant')?.value.trim() || 'VSP';
    const shipByDate = document.getElementById('new-pi-shipby')?.value || '--';
    const containers = parseInt(document.getElementById('new-pi-containers')?.value, 10) || 1;
    const country = document.getElementById('new-pi-dest-country')?.value || 'USA';
    const exporter = document.getElementById('new-pi-exporter')?.value || 'DEVI FISHERIES LIMITED';

    const newId = String(Math.floor(7394 + Math.random() * 100));

    const newRecord = {
      sNo: 1,
      id: newId,
      processor: processor,
      piNumber: piNumber,
      piDate: piDate,
      poNo: poNo,
      buyer: buyer,
      productionPlant: productionPlant,
      shipByDate: shipByDate,
      status: 'Pi-Pending',
      exporter: exporter,
      country: country,
      cartons: containers * 1800,
      totalAmountUsd: containers * 190000
    };

    // Re-index existing
    this.proformaDataset.unshift(newRecord);
    this.proformaDataset.forEach((r, idx) => {
      r.sNo = idx + 1;
    });

    if (typeof Modal !== 'undefined' && Modal.close) {
      Modal.close();
    }

    const tbody = document.getElementById('sales-pi-tbody');
    if (tbody) {
      this.renderProformaRows(this.proformaDataset);
      this.renderProformaTotals(this.proformaDataset);
    } else {
      window.location.hash = '#/sales/orders/proforma-list';
    }

    if (typeof Toast !== 'undefined' && Toast.show) {
      Toast.show(`Proforma Invoice ${piNumber} (ID #${newId}) created successfully!`, 'success');
    }
  },'''

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace from // INTERNAL SCREEN: NEW PROFORMA INVOICE up to // BULK APPROVAL MODAL
    idx_start = content.find('// INTERNAL SCREEN: NEW PROFORMA INVOICE')
    if idx_start == -1:
        print(f"  ⚠ Could not find NEW PROFORMA INVOICE marker in {filepath}")
        return False
    comment_start = content.rfind('// ==========================================', 0, idx_start)
    if comment_start == -1:
        comment_start = idx_start

    idx_bulk = content.find('// BULK APPROVAL MODAL', comment_start)
    if idx_bulk == -1:
        print(f"  ⚠ Could not find BULK APPROVAL marker in {filepath}")
        return False
    comment_bulk = content.rfind('// ==========================================', 0, idx_bulk)
    if comment_bulk == -1:
        comment_bulk = idx_bulk

    new_content = content[:comment_start] + NEW_PI_SECTION_CODE + '\n\n        ' + content[comment_bulk:]

    # Remove obsolete 3-field openNewPiModal stub if present
    old_stub_start = new_content.find('openNewPiModal() {\n    Modal.alert({')
    if old_stub_start != -1:
        old_stub_end = new_content.find('bindEvents() {}', old_stub_start)
        if old_stub_end != -1:
            new_content = new_content[:old_stub_start] + new_content[old_stub_end:]

    # Ensure window.SalesView is exposed
    if 'window.SalesView = SalesView;' not in new_content:
        # Check if SalesView is exported as object
        idx_salesview_end = new_content.find('bindEvents() {}\n};')
        if idx_salesview_end != -1:
            target = 'bindEvents() {}\n};'
            replacement = 'bindEvents() {}\n};\n\nif (typeof window !== "undefined") {\n  window.SalesView = SalesView;\n}'
            new_content = new_content.replace(target, replacement, 1)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"  ✓ Updated {filepath}")
    return True

def main():
    targets = [
        'js/views/salesView.js',
        'scripts/sales_view_code.py',
        'miledeep-devi-fisheries.html',
        'standalone.html'
    ]
    for p in targets:
        if os.path.exists(p):
            print(f"Processing {p}...")
            update_file(p)
        else:
            print(f"Skipping missing {p}")

if __name__ == '__main__':
    main()
