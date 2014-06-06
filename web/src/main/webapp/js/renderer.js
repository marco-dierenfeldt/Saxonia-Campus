/**
 * Renderer für die UI-Elemente der user und adminView 
 */

var saxoniaCampusRenderer = {};

saxoniaCampusRenderer.gridclassArray = ["dummy", "ui-block-a", "ui-block-b", "ui-block-c",
    "ui-block-a", "ui-block-b", "ui-block-c",
    "ui-block-a", "ui-block-b", "ui-block-c",
    "ui-block-a", "ui-block-b", "ui-block-c",
    "ui-block-a", "ui-block-b", "ui-block-c",
    "ui-block-a", "ui-block-b", "ui-block-c",
    "ui-block-a", "ui-block-b", "ui-block-c",
    "ui-block-a", "ui-block-b", "ui-block-c",
    "ui-block-a", "ui-block-b", "ui-block-c",
    "ui-block-a", "ui-block-b", "ui-block-c", ];

saxoniaCampusRenderer.generateInnerSlot = function(slot) {
    var innerSlot = '<a id="'
            + slot.id + '_edit" class="edit_slot">'
            + slot.title + '<p class="ui-li-aside">' + slot.starttime + " bis "
            + slot.endtime + '</p>' + '<span class="ui-li-count">'
            + slot.participants + '</span></a>'
            + '<a class="delete_slot" id="'
            + slot.id + '_delete"></a>';

    return innerSlot;
};

saxoniaCampusRenderer.generateAdminViewSlot = function(slot) {
    var isSlotFull = (slot.capacity - slot.participants) === 0;
    var slotTheme = '';
    
    if (isSlotFull) {
        slotTheme = 'data-theme="c"';
    }
    
    var innerSlot = saxoniaCampusRenderer.generateInnerSlot(slot);
    var slotHtml = '<li id="' + slot.id + '_slot"' + slotTheme + '>' + innerSlot + '</li>';

    return slotHtml;
};

saxoniaCampusRenderer.renderAdminViewSlot = function(slotListSelector, slot) {
    var adminViewSlotHtml = saxoniaCampusRenderer.generateAdminViewSlot(slot);

    $(slotListSelector).append(adminViewSlotHtml);
};

saxoniaCampusRenderer.renderRoomOption = function(roomSelectSelector, room) {
    var option = '<option value="' + room.id + '">' + room.roomnumber + '</option>';

    $(roomSelectSelector).append(option);
};

saxoniaCampusRenderer.renderParticipantOption = function(participantsSelectSelector, participant) {
    var option = '<option value="' + participant.username + '">' + participant.firstname + ' ' + participant.lastname + '</option>';

    $(participantsSelectSelector).append(option);
};

saxoniaCampusRenderer.renderUserViewBookedSlot = function(slotListSelector, slot) {
    var slotHtml = '<li id="' + slot.id + '_slot"><a><span class="booked_slot_title">' + slot.title + '</span><p>'
            + slot.starttime + " bis " + slot.endtime + ' : Raum ' + slot.room + '</p></a><a id="' + slot.id
            + '_delete_slot" class="delete_slot"></a></li>';
    $(slotListSelector).append(slotHtml);
};

saxoniaCampusRenderer.renderUserViewDetailSlot = function(slot) {
    var slotListSelector = '#' + slot.roomId + '_room_slotset';
    var isSlotBooked = saxoniaCampusPersistance.isSlotBooked(slot.id);
    var freeCapacity = (slot.capacity - slot.participants);
    var showBookButton = (freeCapacity > 0) && (!isSlotBooked);

    var slotHtml = '<div data-role="collapsible" data-inset="true" '
            + 'data-collapsed-icon="carat-d" data-expanded-icon="carat-u" '
            + 'title="' + slot.title + '">'
            + '<h3>' + slot.title + ' <br> ' + slot.starttime + ' bis ' + slot.endtime + '</h3>'
            + '<table class="user_view_detail">'
            + '<tr><td colspan="2">Beschreibung: </td>';

    //Buchen-Button nur rendern, wenn freie Plätze vorhanden sind
    if (showBookButton) {
        slotHtml = slotHtml + '<td><button class="book_slot_btn" id="' + slot.id
                + '_book_btn" data-mini="true" data-inline="true">Buchen</button></td>';
    } else {
        slotHtml = slotHtml + '<td></td>';
    }

    slotHtml = slotHtml + '</tr>'
            + '<tr><td colspan="3"> <textarea id="content_input" readonly="true">' + slot.description + '</textarea></td></tr>'
            + '<tr><td>Raum:<br>' + slot.room + '</td>'
            + '<td>Speaker:<br>' + slot.speaker + '</td>'
            + '<td>Freie Plätze:<br><span id="' + slot.id + '_free">' + freeCapacity + '</span></td>'
            + '</tr>'
            + '</table>'
            + '</div>';

    $(slotListSelector).append(slotHtml);
};

saxoniaCampusRenderer.renderRoomGrid = function(gridviewSelector, room) {
    var gridClass = saxoniaCampusRenderer.gridclassArray[room.id];
    var roomSlotList = saxoniaCampusRenderer.generateRoomSlotList(room);

    $(gridviewSelector).append('<div id="' + room.id + '_room_grid" class="'
            + gridClass + '">' + roomSlotList + '</div>');
};

saxoniaCampusRenderer.generateRoomSlotList = function(room) {
    var roomSlotList = '<h4>Raum: ' + room.roomnumber + '</h4>'
            + '<div id="' + room.id + '_room_slotset" '
            + 'data-role="collapsibleset" data-mini="true"></div>';
    return roomSlotList;
};
